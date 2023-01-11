import { Colors } from "mobile-ui"
import React from "react"
import ContentLoader, { Rect } from "react-content-loader/native"
import { View, Dimensions } from "react-native"

const LoadingRestaurants = () => {
  const width = Dimensions.get("screen").width * 0.85

  return (
    <View
      className={`mr-4 h-[300px] w-[${width}px] overflow-hidden rounded-2xl bg-white`}
    >
      <ContentLoader
        speed={1}
        width={width}
        height={300}
        viewBox={`0 0 ${width} 300`}
        backgroundColor={Colors.liteGray}
        foregroundColor={Colors.bgColor}
      >
        <Rect rx="15" ry="15" width={`${width}`} height="235" />
        <Rect x="10" y="241" rx="5" ry="5" width="156" height="16" />
        <Rect x="10" y="263" rx="5" ry="5" width="165" height="12" />
        <Rect x="10" y="281" rx="5" ry="5" width="50" height="12" />
      </ContentLoader>
    </View>
  )
}

export default LoadingRestaurants
