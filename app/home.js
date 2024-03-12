import { useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Video } from 'expo-av'; // Import Video from 'expo-av'

import { COLORS, icons, images, SIZES } from "../constants";
import {
  Popularsports,
  ScreenHeaderBtn,
  Welcome,
} from "../components";


const Home = () => {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension='60%' />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimension='100%' />
          ),
          headerTitle: "",
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          {/* <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              if (searchTerm) {
                router.push(`/search/${searchTerm}`)
              }
            }}
          /> */}

          {/* {selectedVideo && (
            <Video
              source={{ uri: selectedVideo.uri }}
              style={{ width: '100%', height: 300 }}
              resizeMode="contain"
              shouldPlay
            />
          )} */}

          <Popularsports/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
