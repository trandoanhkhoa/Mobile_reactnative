/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
    StyleSheet,
        Text,
        TouchableOpacity,
        FlatList,
        View


} from 'react-native';

import {
    Colors,
        DebugInstructions,
        Header,
        LearnMoreLinks,
        ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
const styles = StyleSheet.create({
    headerView: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
},
    headerText: {
        color: "#034EA2",

    },
    headerUnderline: {
       width: "100%",
       borderColor: "#034EA2",
       borderBottomWidth: 1,
       marginTop: "%",
    }
})
type HeaderTextProps = {
    content: string
}
const HeaderText  = (props: HeaderTextProps) =>{
    return <Text style={styles.headerText}>{props.content}</Text>

}

const HeadingOrder = () => {
    return(
         <View style={styles.headerView}>
             <TouchableOpacity >
                 <HeaderText content="Chọn phim / Rạp / Xuất"/>
                 <View style={styles.headerUnderline}></View>
             </TouchableOpacity>
             <TouchableOpacity >
                 <HeaderText content="Chọn ghế"/>
             </TouchableOpacity>
             <TouchableOpacity >
                 <HeaderText content="Chọn thức ăn"/>
             </TouchableOpacity>
             <TouchableOpacity >
                 <HeaderText content="Thanh toán"/>
             </TouchableOpacity>
             <TouchableOpacity >
                 <HeaderText content="Xác nhận"/>
             </TouchableOpacity>
         </View>
    )
}

const App = () => {
    return (
        <>
            <HeadingOrder />
        </>
    )
}


export default App;
