import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import fetchApi from "../../utils/fetchApi";

export const fetchPhotosAsync = createAsyncThunk("images/fetch", async () => {
  return await fetchApi("GET", "/images");
});

export const fetchPhotoDetailsAsync = createAsyncThunk(
  "image/fetch",
  async (photoId) => {
    return await fetchApi("GET", `/images/${photoId}`);
  }
);

export const uploadImageAsync = createAsyncThunk(
  "image/upload",
  async (formData) => {
    const headers = { "Content-Type": "multipart/form-data" };
    return await fetchApi("POST", "/images", formData, headers);
  }
);

export const deletePhotoAsync = createAsyncThunk(
  "image/delete",
  async (photoId) => {
    return await fetchApi("DELETE", `/images/${photoId}`);
  }
);

export const markPhotoFavouriteAsync = createAsyncThunk(
  "image/favourite",
  async ({ photoId, isFavourite }) => {
    return await fetchApi("POST", "/images/image/favourite", {
      photoId,
      isFavourite,
    });
  }
);

export const createAlbumAsync = createAsyncThunk(
  "album/create",
  async (albumData) => {
    return await fetchApi("POST", "/albums", albumData);
  }
);

export const fetchAlbumsAsync = createAsyncThunk("albums/fetch", async () => {
  return await fetchApi("GET", "/albums");
});

export const fetchAlbumAsync = createAsyncThunk(
  "album/fetch",
  async (albumId) => {
    return await fetchApi("GET", `/albums/${albumId}`);
  }
);

export const addPhotosToAlbumAsync = createAsyncThunk(
  "album-photos/upload",
  async ({ albumId, photosIdArr }) => {
    return await fetchApi("POST", `/albums/${albumId}`, {
      imagesIdArr: photosIdArr,
    });
  }
);

export const editAlbumInfoAsync = createAsyncThunk(
  "album/edit",
  async ({ albumInfoToUpdate, albumId }) => {
    return await fetchApi("POST", `/albums/${albumId}`, { albumInfoToUpdate });
  }
);

export const deleteAlbumAsync = createAsyncThunk(
  "album/delete",
  async (albumId) => {
    return await fetchApi("DELETE", `/albums/${albumId}`);
  }
);

export const removePhotosFromAlbumAsync = createAsyncThunk(
  "albumPhotos/remove",
  async ({ albumId, photosIdArr }) => {
    return await fetchApi("POST", "/album/photos", { albumId, photosIdArr });
  }
);

export const photoSlice = createSlice({
  name: "photos",
  initialState: {
    photos: [],
    albums: [],
    album: { album: null, photos: [] },
    photoDetails: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(uploadImageAsync.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(uploadImageAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.photos.push(action.payload.savedImage);
    });
    builder.addCase(uploadImageAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(fetchPhotosAsync.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchPhotosAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.photos = action.payload;
    });
    builder.addCase(fetchPhotosAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(fetchPhotoDetailsAsync.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchPhotoDetailsAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.photoDetails = action.payload;
    });
    builder.addCase(fetchPhotoDetailsAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(deletePhotoAsync.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(deletePhotoAsync.fulfilled, (state, action) => {
      const deletedPhoto = action.payload.deletedPhoto;

      if (state.photos.length > 0) {
        const updatedPhotos = state.photos.filter(
          (photo) => photo._id !== deletedPhoto._id
        );

        state.photos = updatedPhotos;
      }
      state.photoDetails = null;

      state.status = "success";
    });
    builder.addCase(deletePhotoAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(markPhotoFavouriteAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.error = null;
      const { updatedImage } = action.payload;

      if (state.photos.length > 0) {
        const findPhoto = state.photos.find(
          (photo) => photo._id === updatedImage._id
        );
        findPhoto.isFavourite = updatedImage.isFavourite;
      }

      if (state.photoDetails._id === updatedImage._id) {
        state.photoDetails.isFavourite = updatedImage.isFavourite;
      }
    });

    //album
    builder.addCase(createAlbumAsync.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(createAlbumAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.albums.push(action.payload.savedAlbum);
    });
    builder.addCase(createAlbumAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(fetchAlbumsAsync.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchAlbumsAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.albums = action.payload;
    });
    builder.addCase(fetchAlbumsAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(fetchAlbumAsync.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchAlbumAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.album = action.payload;
    });
    builder.addCase(fetchAlbumAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(addPhotosToAlbumAsync.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(addPhotosToAlbumAsync.fulfilled, (state, action) => {
      const { albumPhotos } = action.payload;
      state.status = "success";

      albumPhotos.forEach((photo) => state.album.photos.push(photo));

      if (state.photos.length > 0) {
        albumPhotos.forEach((photo) => {
          const findPhoto = state.photos.find((img) => img._id === photo._id);
          if (findPhoto) findPhoto.album = photo.album;
        });
      }
    });
    builder.addCase(addPhotosToAlbumAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(editAlbumInfoAsync.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(editAlbumInfoAsync.fulfilled, (state, action) => {
      state.status = "success";
      const { updatedAlbumInfo } = action.payload;

      if (state.albums.length > 0) {
        const findAlbumIndex = state.albums.findIndex(
          (album) => album._id === updatedAlbumInfo._id
        );
        if (findAlbumIndex !== -1) {
          state.albums[findAlbumIndex] = updatedAlbumInfo;
        }
      }

      if (state.album?.album?._id === updatedAlbumInfo._id) {
        state.album.album = updatedAlbumInfo;
      }
    });
    builder.addCase(editAlbumInfoAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(deleteAlbumAsync.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(deleteAlbumAsync.fulfilled, (state, action) => {
      state.status = "success";
      const { deletedAlbum } = action.payload;

      if (state.albums.length > 0) {
        state.albums = state.albums.filter(
          (album) => album._id !== deletedAlbum._id
        );
      }

      if (state.album?.album._id === deletedAlbum._id) {
        state.album = null;
      }

      if (state.photos.length > 0) {
        state.photos = state.photos.map((photo) => {
          if (photo?.album === deletedAlbum._id) {
            return { ...photo, album: null };
          }
          return photo;
        });
      }
    });
    builder.addCase(deleteAlbumAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(removePhotosFromAlbumAsync.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(removePhotosFromAlbumAsync.fulfilled, (state, action) => {
      state.status = "success";
      const { updatedImages, albumId } = action.payload;

      if (state.photos.length > 0) {
        updatedImages.forEach((image) => {
          const findImage = state.photos.find(
            (photo) => photo._id === image._id && photo.album === albumId
          );

          if (findImage) {
            findImage.album = null;
          }
        });
      }

      if (state.album?.photos.length > 0) {
        const removedImagesId = updatedImages.map((image) => image._id);
        state.album.photos = state.album?.photos.filter(
          (photo) => !removedImagesId.includes(photo._id)
        );
      }
    });
    builder.addCase(removePhotosFromAlbumAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});
