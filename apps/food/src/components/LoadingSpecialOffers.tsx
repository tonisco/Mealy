import { Colors } from "mobile-ui"
import React from "react"
import ContentLoader, { Rect } from "react-content-loader/native"
import { View } from "react-native"

const LoadingSpecialOffers = () => {
  return (
    <View className="mr-4 h-[208px] w-[145px] overflow-hidden rounded-2xl bg-white">
      <ContentLoader
        speed={1}
        width={145}
        height={208}
        viewBox="0 0 145 208"
        backgroundColor={Colors.liteGray}
        foregroundColor={Colors.bgColor}
      >
        <Rect rx="15" ry="15" width="145" height="140" />
        <Rect x="10" y="146" rx="5" ry="5" width="105" height="14" />
        <Rect x="10" y="166" rx="5" ry="5" width="115" height="14" />
        <Rect x="10" y="186" rx="5" ry="5" width="110" height="14" />
      </ContentLoader>
    </View>
  )
}

export default LoadingSpecialOffers
