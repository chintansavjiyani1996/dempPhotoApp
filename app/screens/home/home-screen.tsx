import React, { FC, useRef } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Platform, FlatList, Image, Dimensions,TouchableOpacity } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import ActionSheet from 'react-native-actionsheet';
import { Button, Screen, Text } from "../../components"
import * as ImagePicker from 'expo-image-picker';

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { RootStore, useStores } from "../../models"

const WINDOW = Dimensions.get('window');

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `home: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="home" component={HomeScreen} />`
// Hint: Look for the 🔥!


const CameraPhotoOptions: any = {
  mediaTypes: ImagePicker.MediaTypeOptions.All,
  allowsEditing: true,
  aspect: [4, 3],
  quality: 1,
};
const GalleryPickerOptions: any = {
  mediaTypes: ImagePicker.MediaTypeOptions.All,
  allowsEditing: true,
  aspect: [4, 3],
  quality: 1,
};
// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const HomeScreen: FC<StackScreenProps<NavigatorParamList, "home">> = observer(
  function HomeScreen() {

    const refActionSheet = useRef(null);
    const rootStore: RootStore = useStores()


    const showImagePicker = async (type: number) => {
      switch (type) {
        case 0:
          let result: any = await ImagePicker.launchImageLibraryAsync(CameraPhotoOptions);
          if (!result.cancelled) {
            rootStore.photoStore.savePhotos({uri:result.uri,category:rootStore.photoStore.selectedCategory})
          }
        case 1:
          try {
            // let result =  ImagePicker.launchCameraAsync(CameraPhotoOptions)
            // if (!result.cancelled) {

            //   console.log("result",result.uri)

            // }

          } catch (error) {

          }

          break;

        default:
          break;
      }
    }

    const showActionSheet = (index: number) => {
      showImagePicker(index);
    }

    const onTapUploadImage = () => {
      if (refActionSheet.current) {
        refActionSheet.current.show();
      }
    }

    const renderPhotos = (({ item, index }) => {
      return (
        <Image
          style={{
            width: WINDOW.width / 3 - 2,
            height: WINDOW.width / 3 - 2,
            resizeMode: 'cover',
          }}
          resizeMode={'cover'}
          source={{ uri: 'file://' + item.uri }}
        />
      )
    })

    const renderCategory = () => {
      const {photoStore}= rootStore
      return (
        <View style={{ flexDirection:"row",flexWrap:"wrap"}}>
          {
            photoStore.category.map((value) => {
              return (
                <TouchableOpacity onPress={()=>photoStore.updatedSelectedCategory(value)} style={{borderWidth:1,padding:20,margin:10,borderColor:photoStore.selectedCategory==value?"red":"blue"}} >
                  <Text>{value}</Text>
                </TouchableOpacity>
              )
            })
          }
        </View>
      )
    }

    console.log("{rootStore.photoStore.photos",rootStore.photoStore.photos)

    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()
    return (
      <Screen style={ROOT} preset="scroll">
        <ActionSheet
          ref={refActionSheet}
          title={'Select photo'}
          options={['Choose from gallery', 'Take photo', 'Cancel']}
          cancelButtonIndex={2}
          onPress={index => showActionSheet(index)}
        />
        <Text preset="header" text="home" />
        {renderCategory()}
        <FlatList
          data={rootStore.photoStore.photos}
          numColumns={3}
          renderItem={renderPhotos}
          keyExtractor={(item, index) => index.toString()}
        />
        <Button
          onPress={onTapUploadImage}
          text={'Upload Image'}
        ></Button>
      </Screen>
    )
  },
)
