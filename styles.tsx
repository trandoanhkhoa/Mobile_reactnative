import {StyleSheet} from 'react-native';
const color = {
    background: '#F9F9F9',
    block: '#ffffff',
    shadowBlock: '#171717',
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
        width: 100,
        height: 100,
        borderRadius: 10,
        marginLeft: 20,
    },
    bookingClapperBoardParent: {
        width: '100%',
        backgroundColor: color.block,
        paddingVertical: 40,
    },
    bookingBar: {
        borderWidth: 5,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: '100%',
    },

    bookingDropDownParent: {
        backgroundColor: '#fffffff',
        marginVertical: 20,
        width: '100%',
    },

    bookingDropDownHeader: {
        backgroundColor: color.block,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
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
        backgroundColor: '#034ea2',
        width: 37,
        height: 37,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
        marginEnd: 20,
    },
    bookingShadowBlock: {
        shadowColor: color.shadowBlock,
        shadowOffset: {width: -2, height: 20},
        shadowOpacity: 0.6,
        shadowRadius: 3,
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
});
export default styles;
