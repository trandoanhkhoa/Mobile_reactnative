import {StyleSheet, Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const color = {
    background: '#F9F9F9',
    block: '#ffffff',
    shadowBlock: '#171717',
    button: '#034ea2',
    movement: '#C5C5C5',
    footerBtn: '#f58020',
    orange: '#f58020',
    selectedSeat: '#d0d0d0',
};
const styles = StyleSheet.create({
    bookingBody: {
        backgroundColor: color.background,
        flex: 1,
    },
    bookingHeaderView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'nowrap',
        backgroundColor: color.block,
        height: 100,
        marginTop: 10,
        marginBottom: 40,
    },
    bookingHeaderText: {
        textAlign: 'center',
        color: '#034EA2',
        height: 50,
        fontFamily: 'NunitoSans_SemiBold',
        fontSize: 16,
    },
    bookingHeaderUnderline: {
        width: '100%',
        borderBottomWidth: 1,
        marginTop: '5%',
    },
    bookingTouchOpacity: {
        width: '19%',
        height: '50%',
    },

    bookingClapperBoard: {
        width: screenWidth / 2.65,
        height: screenHeight / 5,
        borderRadius: 10,
        marginHorizontal: 20
    },
    bookingClapperBoardTxt: {
        fontFamily: 'NunitoSans_SemiBold',
        textAlign: 'left',
        fontSize: 19,
    },
    bookingClapperBoardParent: {
        width: '100%',
        backgroundColor: color.block,
        paddingVertical: 40,

    },
    //BUG: can not set color of bookingBar
    bookingBar: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width: '100%',
        backgroundColor: color.orange,
        height: 10,
    },

    bookingDropDownParent: {
        backgroundColor: color.block,
        marginVertical: 20,
        width: '100%',
    },

    bookingDropDownHeader: {
        backgroundColor: color.block,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingVertical: 10,
    },
    bookingHeading: {
        fontFamily: 'NunitoSans_ExtraBold',
        fontSize: 28,
        color: 'black',
        marginLeft: 20,
        marginTop: 8,
        width: '50%',
    },
    bookingDropDownButton: {
        borderRadius: 50,
        backgroundColor: color.button,
        width: 37,
        height: 37,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
        marginEnd: 20,
    },
    //BUG: just using for sub component, can not use for parent dropdown
    bookingShadowBlock: {
        shadowColor: color.shadowBlock,
        shadowOffset: {width: -2, height: 4},
        elevation: 5,
    },
    bookingLocationContent: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap',
        width: '100%',
        backgroundColor: color.block,
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    bookingLocationContentButton: {
        borderRadius: 2,
        borderWidth: 0.2,
        borderColor: 'black',
        padding: 15,
        marginVertical: 10,
        marginRight: 10,
    },
    bookingLocationContentText: {
        fontFamily: 'NunitoSans_SemiBold',
        fontSize: 24,
        textAlign: 'center',
    },

    // booking film

    bookingFilmTouchOpacityBackWard: {
        position: 'absolute',
        zIndex: 100,
        top: '28%',
        left: -5,
        width: 50,
        height: 50,
        backgroundColor: color.movement,
        borderBottomStartRadius: 70,
        borderBottomEndRadius: 70,
        transform: [{rotate: '270deg'}],
    },
    bookingFilmTouchOpacityForWard: {
        position: 'absolute',
        zIndex: 100,
        top: '28%',
        right: -5,
        width: 50,
        height: 50,
        backgroundColor: color.movement,
        borderBottomStartRadius: 70,
        borderBottomEndRadius: 70,
        transform: [{rotate: '90deg'}],
    },
    bookingFilmImg: {
        width: '95%',
        height: screenHeight / 4,
        borderRadius: 10,
        margin: 5,
    },
    bookingFilmContent: {
        width: screenWidth,
        paddingBottom: 20,
        backgroundColor: color.block,
    },

    //booking time
    bookingTimeContent: {
        width: screenWidth,
        paddingBottom: 20,
        backgroundColor: color.block,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    bookingTimeTXTInComing: {
        fontSize: 20,
        fontFamily: 'NunitoSans_ExtraBold',
        color: 'red',
        textAlign: 'center',
    },
    bookingTimeButton: {
        borderRadius: 2,
        borderWidth: 0.2,
        borderColor: 'black',
        marginVertical: 10,
        marginRight: 10,
        padding: 15,
    },
    bookingTimeTouchOpacityBackWard: {
        position: 'absolute',
        zIndex: 100,
        top: '24%',
        left: 10,
        width: 50,
        height: 50,
        borderBottomStartRadius: 70,
        borderBottomEndRadius: 70,
        transform: [{rotate: '270deg'}],
    },
    bookingTimeTouchOpacityForWard: {
        position: 'absolute',
        zIndex: 100,
        top: '24%',
        right: 10,
        width: 50,
        height: 50,
        borderBottomStartRadius: 70,
        borderBottomEndRadius: 70,
        transform: [{rotate: '90deg'}],
    },
    bookingTimeItemShowTimeContainer: {
        marginBottom: 10,
        marginHorizontal: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bookingTimeTXTNormal:{
        fontSize: 20,
        fontFamily: 'NunitoSans_Regular'
    },
    //******************Footer******************
    bookingFooterContainer: {
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        //height: screenHeight / 11,
        borderColor: '#DFDFDF',
        borderWidth: 2,
        justifyContent: 'space-evenly',
    },
    bookingFooterLineContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    bookingFooterLine: {
        backgroundColor: 'black',
        borderRadius: 10,
        width: 80,
        height: 10,
        borderWidth: 1,
    },
    bookingFooterTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 10,
    },
    bookingFooterContainerButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bookingFooterButtonBackground: {
        borderRadius: 2,
        borderWidth: 0.2,
        borderColor: 'black',
        backgroundColor: color.footerBtn,
        marginVertical: 10,
        marginRight: 10,
        padding: 15,
        marginLeft: 10,
        borderRadius: 10,
    },
    bookingFooterTXT: {
        fontSize: 20,
        fontFamily: 'NunitoSans_SemiBold',
    },
    bookingFooterContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginTop: 10,
    },
    bookingSeat: {
        borderRadius: 2,
        borderWidth: 0.2,
        borderColor: 'black',
        marginVertical: 10,
        marginRight: 10,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bookingSeatScreenLine: {
        width: '90%',
        backgroundColor: color.orange,
        height: 5,
        marginTop: 10,
    },

    //****************************************Booking Combo****************************************
    bookingComboImg: {
        width: '50%',
        height: 150,
        borderRadius: 10,
    },
    bookingComboContainerItem: {
        flexDirection: 'row',
        margin: 10,
    },
    bookingComboTXTBig: {
        fontSize: 20,
        fontFamily: 'NunitoSans_ExtraBold',
    },
    bookingComboContainerTXT: {
        marginLeft: 20,
        justifyContent: 'center',
    },
    bookingComboSign: {
        fontSize: 30,
        fontFamily: 'NunitoSans_ExtraBold',
        color: color.block,
    },
    bookingComboQuantity: {
        fontSize: 20,
        fontFamily: 'NunitoSans_Regular',
        color: color.block,
    },

    bookingComboContainerIncreDecre: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 10,
        backgroundColor: color.button,
        width: screenWidth/2.6,
    },
    bookingComboButton: {
        marginHorizontal: 20,
        paddingHorizontal: 10,
    },
});
export default styles;
export {color};
