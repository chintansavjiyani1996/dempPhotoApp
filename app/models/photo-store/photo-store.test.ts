import { PhotoStoreModel } from "./photo-store"

test("can be created", () => {
  const instance = PhotoStoreModel.create({})

  expect(instance).toBeTruthy()
})
