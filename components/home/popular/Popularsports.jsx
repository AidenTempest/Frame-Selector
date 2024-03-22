import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  Dimensions,
  Pressable,
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
} from "react-native";
// import * as ImagePicker from "expo-image-picker"; // Import from expo-image-picker
// import { Video } from "expo-av"; // Import Video from 'expo-av'
// import * as FileSystem from "expo-file-system"; // Import FileSystem from 'expo-file-system'
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { Video } from "expo-av";

// const FRAME_PER_SEC = 1;
const FRAME_WIDTH = 60; // Adjust the frame width
const SCREEN_WIDTH = Dimensions.get("screen").width;
const SCREEN_HEIGHT = Dimensions.get("screen").height;

const TILE_HEIGHT = 40; // Adjust the tile height
const TILE_WIDTH = FRAME_WIDTH / 2; // Adjust the tile width

// const getFileNameFromPath = (path) => {
//   if (!path) return ""; // Check if path is undefined or null

//   const fragments = path.split("/");
//   let fileName = fragments[fragments.length - 1];
//   fileName = fileName.split(".")[0];
//   return fileName;
// };

// const FRAME_STATUS = Object.freeze({
//   LOADING: "LOADING",
//   READY: "READY",
// });

const App = () => {
  const [selectedVideo, setSelectedVideo] = useState(null); // {uri: <string>, localFileName: <string>, creationDate: <Date>}
  // const [frames, setFrames] = useState(null); // <[{status: <FRAME_STATUS>}]>
  // const video = useRef(null);

  // const handlePressSelectVideoButton = async () => {
  //   try {
  //     const videoAsset = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Videos,
  //     });

  //     if (videoAsset && !videoAsset.cancelled) {
  //       console.log(`Selected video ${JSON.stringify(videoAsset, null, 2)}`);
  //       setSelectedVideo({
  //         uri: videoAsset.assets[0].uri, // Update this line to access the uri property from the assets array
  //         localFileName: getFileNameFromPath(videoAsset.assets[0].uri),
  //         creationDate: videoAsset.creationDate,
  //       });

  //       console.log("Selected video URI:", videoAsset.assets[0].uri); // New console log statement
  //     } else {
  //       console.log("Video selection cancelled");
  //     }
  //   } catch (error) {
  //     console.error("Error selecting video:", error);
  //   }
  // };

  // const handleVideoLoad = (videoAssetLoaded) => {
  //   if (videoAssetLoaded && selectedVideo && video.current) {
  //     console.log("Video loaded:", videoAssetLoaded);
  //     video.current.playAsync();
  //   }
  // };

  // useEffect(() => {
  //   if (selectedVideo) {
  //     handleVideoLoad();
  //   }
  // }, [selectedVideo]);

  // const renderFrame = (frame, index) => {
  //   if (frame.status === FRAME_STATUS.LOADING) {
  //     return <View style={styles.loadingFrame} key={index}></View>;
  //   } else {
  //     return (
  //       <Image
  //         key={index}
  //         source={{ uri: "file://" + frame }}
  //         style={{
  //           width: TILE_WIDTH,
  //           height: TILE_HEIGHT,
  //         }}
  //       />
  //     );
  //   }
  // };

  useEffect(() => {
    setSelectedVideo(null);
  }, []);

  const selectVideo = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync({ type: "video/*" });
      if (!file.canceled) {
        setSelectedVideo(file);
      }
    } catch (error) {
      console.error("Error selecting video:", error);
    }
  };

  const renderVideoPlayer = (selectedVideo) => {
    if (!selectedVideo) {
      return null;
    }

    return (
      <Video
        source={{ uri: selectedVideo.assets[0].uri }}
        style={styles.video}
        resizeMode="contain"
        useNativeControls
      />
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* {selectedVideo ? (
        <>
          <View style={styles.videoContainer}>
            <Video
              ref={video}
              style={[styles.video, { zIndex: 1 }]} // Add zIndex to style
              resizeMode={"cover"}
              source={{ uri: selectedVideo.uri }}
              repeat={true}
              onLoad={handleVideoLoad}
              onError={(error) => console.error("Video Error:", error)}
              onPlaybackStatusUpdate={(status) =>
                console.log("Playback Status Update:", status)
              }
            />
          </View>

          {frames && (
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={styles.framesLine}
              alwaysBounceHorizontal={true}
              scrollEventThrottle={1}
            >
              {frames.map((frame, index) => renderFrame(frame, index))}
            </ScrollView>
          )}
        </>
      ) : (
        <Pressable
          style={styles.buttonContainer}
          onPress={handlePressSelectVideoButton}
        >
          <Text style={styles.buttonText}>Select a video</Text>
        </Pressable>
      )} */}
      {!selectedVideo && (
        <Pressable style={styles.buttonContainer} onPress={selectVideo}>
          <Text style={styles.buttonText}>Select a video</Text>
        </Pressable>
      )}
      {renderVideoPlayer(selectedVideo)}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 16,
  },
  buttonText: {
    color: "#fff",
  },
  videoContainer: {
    width: SCREEN_WIDTH,
    height: 0.6 * SCREEN_HEIGHT,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },

  video: {
    alignItems: "center",
    justifyContent: "center",
  },
  framesLine: {
    width: SCREEN_WIDTH,
  },
  loadingFrame: {
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderColor: "rgba(0,0,0,0.1)",
    borderWidth: 1,
  },

  video: {
    width: 300,
    height: 200,
  },
});

export default App;
