import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {Text, TouchableOpacity, View, Image, Button, ScrollView} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
type BookingTextProps = {
    content: string;
    disabled: boolean;
};
const BookingHeaderText = (props: BookingTextProps) => {
    return (
        <Text
            style={[
                styles.bookingHeaderText,
                {color: props.disabled ? '#D0D0D0' : '#034EA2'},
            ]}
            numberOfLines={2}>
            {props.content}
        </Text>
    );
};
type BookingUnderlineHeaderProps = {
    selectedButton: boolean;
};
const BookingUnderlineHeader = (props: BookingUnderlineHeaderProps) => {
    return (
        <View
            style={[
                styles.bookingHeaderUnderline,
                {borderColor: props.selectedButton ? '#034EA2' : '#E9ECEF'},
            ]}></View>
    );
};

type BookingLocationHeadingProps = {
    content: string;
};
const BookingHeading = (props: BookingLocationHeadingProps) => {
    return <Text style={styles.bookingHeading}>{props.content}</Text>;
};
const HeadingBook = () => {
    const [selectedButton, setSelectedButton] = useState(0);
    const buttons = [
        {
            content: `Chọn phim / Rạp \n/  Xuất`,
            style: [styles.bookingTouchOpacity, {width: '24%'}],
            disabled: false,
        },
        {
            content: `Chọn\n ghế `,
            style: styles.bookingTouchOpacity,
            disabled: true,
        },
        {
            content: `Chọn thức\n ăn`,
            style: styles.bookingTouchOpacity,
            disabled: true,
        },
        {
            content: `Thanh \ntoán`,
            style: styles.bookingTouchOpacity,
            disabled: true,
        },
        {
            content: `Xác \nnhận`,
            style: styles.bookingTouchOpacity,
            disabled: true,
        },
    ];
    return (
        <View style={styles.bookingHeaderView}>
            {buttons.map((button, index) => (
                <TouchableOpacity
                    style={button.style}
                    onPress={() => setSelectedButton(index)}
                    disabled={button.disabled}>
                    <BookingHeaderText
                        content={button.content}
                        disabled={button.disabled}></BookingHeaderText>
                    <BookingUnderlineHeader
                        selectedButton={
                            index === selectedButton ? true : false
                        }></BookingUnderlineHeader>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const BookingResult = () => {
    return (
        <View>
            <View style={styles.bookingBar}></View>
            <View style={styles.bookingClapperBoardParent}>
                <Image
                    source={require('./assets/imgs/clapperBoard.png')}
                    style={styles.bookingClapperBoard}
                />
            </View>
        </View>
    );
};
type BookingLocationContentProps = {
    setHeading: React.Dispatch<React.SetStateAction<string>>;
    setLocation: React.Dispatch<React.SetStateAction<string>>;
};
const BookingLocationContent = (props: BookingLocationContentProps) => {
    const buttons = [
        {content: 'TP.Hồ Chí Minh'},
        {content: 'Hà Nội'},
        {content: 'Đà Nẵng'},
        {content: 'An Giang'},
        {content: 'Bà Rịa - Vũng Tàu'},
        {content: 'Bến Tre'},
        {content: 'Cà Mau'},
        {content: 'Đắk Lắk'},
        {content: 'Hải Phòng'},
        {content: 'Khánh Hòa'},
        {content: 'Nghệ An'},
    ];
    return (
        <View style={styles.bookingLocationContent}>
            {buttons.map((button, index) => (
                <TouchableOpacity
                    style={styles.bookingLocationContentButton}
                    onPress={() => {
                        props.setHeading('Chọn vị trí - ' + button.content);
                        props.setLocation(button.content);
                    }}>
                    <Text style={styles.bookingLocationContentText}>
                        {button.content}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

type BookingLocationProps = {
    openDropdown: string;
    setOpenDropdown: React.Dispatch<React.SetStateAction<string>>;
    setLocation: React.Dispatch<React.SetStateAction<string>>;
};

const BookingLocation = (props: BookingLocationProps) => {
    const [heading, setHeading] = useState('Chọn vị trí');
    return (
        <View style={[styles.bookingDropDownParent, styles.bookingShadowBlock]}>
            <View style={styles.bookingDropDownHeader}>
                <BookingHeading content={heading} />
                <TouchableOpacity
                    style={styles.bookingDropDownButton}
                    onPress={() => props.setOpenDropdown('dropdown1')}>
                    <Icon
                        name={
                            props.openDropdown === 'dropdown1'
                                ? 'caret-up'
                                : 'caret-down'
                        }
                        color="#ffffff"
                        size={28}
                    />
                </TouchableOpacity>
            </View>

            {props.openDropdown === 'dropdown1' && (
                <BookingLocationContent
                    setHeading={setHeading}
                    setLocation={props.setLocation}
                />
            )}
        </View>
    );
};

type BookingFilmProps = {
    openDropdown: string;
    setOpenDropdown: React.Dispatch<React.SetStateAction<string>>;
    setFilm: React.Dispatch<React.SetStateAction<string>>;
};
const BookingFilm = (props: BookingFilmProps) => {
    const [heading, setHeading] = useState('Chọn phim');
    return (
        <View style={[styles.bookingDropDownParent, styles.bookingShadowBlock]}>
            <View style={styles.bookingDropDownHeader}>
                <BookingHeading content={heading} />
                <TouchableOpacity
                    style={styles.bookingDropDownButton}
                    onPress={() => props.setOpenDropdown('dropdown2')}>
                    <Icon
                        name={
                            props.openDropdown === 'dropdown2'
                                ? 'caret-up'
                                : 'caret-down'
                        }
                        color="#ffffff"
                        size={28}
                    />
                </TouchableOpacity>
            </View>

            {props.openDropdown === 'dropdown2' && (
                <BookingLocationContent
                    setHeading={setHeading}
                    setLocation={props.setLocation}
                />
            )}
        </View>
    );
};

const BookingStage1 = () => {
    const [location, setLocation] = useState('');
    const [film, setFilm] = useState('');
    const [showtime, setShowtime] = useState('');
    const [openDropDown, setOpenDropDown] = useState('dropdown1');

    return (
        <ScrollView>
            <BookingLocation
                openDropdown={openDropDown}
                setOpenDropdown={setOpenDropDown}
                setLocation={setLocation}
            />

        </ScrollView>
    );
};
const App = () => {
    return (
        <View style={styles.bookingBody}>
            <HeadingBook />
            <BookingResult />
            <BookingStage1 />
        </View>
    );
};

export default App;
