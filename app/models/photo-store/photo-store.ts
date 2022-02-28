import { toJS } from "mobx"
import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 * 
 * 
 */



 const photosModal = types
 .model("photosStore")
 .props({
  uri:"",
  category:""
 })
 

export const PhotoStoreModel = types
  .model("PhotoStore")
  .props({
    photos: types.optional(types.array(photosModal), [] as any),
    category:types.optional(types.array(types.string), ["landscape","abstract","portrait"]),
    selectedCategory:types.optional(types.string ,"landscape"),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    savePhotos: (photoData) => {
      self.photos.push(photoData)
    },
    updatedSelectedCategory:(category)=>{
      self.selectedCategory=category
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type PhotoStoreType = Instance<typeof PhotoStoreModel>
export interface PhotoStore extends PhotoStoreType {}
type PhotoStoreSnapshotType = SnapshotOut<typeof PhotoStoreModel>
export interface PhotoStoreSnapshot extends PhotoStoreSnapshotType {}
export const createPhotoStoreDefaultModel = () => types.optional(PhotoStoreModel, {})
