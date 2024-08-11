import { FlickrImageAuthor, FlickrPhoto } from "@customTypes/flickrTypes";
import { constructPhotoObject, defaultAuthor } from "../constructPhotoObject";

describe("constructPhotoObject", () => {
  const authorDetails: FlickrImageAuthor[] = [
    { id: "123", username: "realname123", realname: "Real Name" },
  ];

  const photoList: FlickrPhoto[] = [
    { id: "1", secret: "abc", server: "001", title: "Photo 1", owner: "123" },
    { id: "3", secret: "ghi", server: "003", title: "Photo 3", owner: "" },
    { id: "4", secret: "jkl", server: "004", title: "Photo 4" },
  ];

  it("should correctly map photo objects to include author information", () => {
    const result = constructPhotoObject(photoList, authorDetails);

    expect(result).toEqual([
      {
        id: "1",
        secret: "abc",
        server: "001",
        title: "Photo 1",
        owner: "123",
        author: { id: "123", username: "realname123", realname: "Real Name" },
      },
      {
        id: "3",
        secret: "ghi",
        server: "003",
        title: "Photo 3",
        owner: "",
        author: defaultAuthor,
      },
      {
        id: "4",
        secret: "jkl",
        server: "004",
        title: "Photo 4",
        author: defaultAuthor,
      },
    ]);
  });

  it("should use the default author for photos with unknown owners", () => {
    const result = constructPhotoObject(
      [
        {
          id: "5",
          secret: "mno",
          server: "005",
          title: "Photo 5",
          owner: "unknown_owner",
        },
      ],
      authorDetails
    );

    expect(result).toEqual([
      {
        id: "5",
        secret: "mno",
        server: "005",
        title: "Photo 5",
        owner: "unknown_owner",
        author: defaultAuthor,
      },
    ]);
  });

  it("should handle an empty photo list", () => {
    const result = constructPhotoObject([], authorDetails);

    expect(result).toEqual([]);
  });

  it("should handle an empty details list", () => {
    const result = constructPhotoObject(photoList, []);

    expect(result).toEqual([
      {
        id: "1",
        secret: "abc",
        server: "001",
        title: "Photo 1",
        owner: "123",
        author: defaultAuthor,
      },
      {
        id: "3",
        secret: "ghi",
        server: "003",
        title: "Photo 3",
        owner: "",
        author: defaultAuthor,
      },
      {
        id: "4",
        secret: "jkl",
        server: "004",
        title: "Photo 4",
        author: defaultAuthor,
      },
    ]);
  });
});
