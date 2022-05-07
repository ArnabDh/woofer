const mockUser = {
  uid: "asdf123456",
  emailVerified: true,
  userId: "1234asdfuasdf",
  email: "johndoe@gmail.com",
  username: "john124412",
  firstName: "John",
  lastName: "Doe",
  profilePicture:
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  zodiac: "Virgo",
  gender: "Male",
  breed: "Shiba",
  bio: "Example description",
  birthday: "06/12/2002",
  preference: "Female",
  zipcodes: [],
  pictures: [],
  chats: [],
}

jest.mock("mockUser", () => mockUser)

export default mockUser
