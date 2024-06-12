import React, {useState, useEffect, useRef} from 'react';
import type {} from 'react';
import firestore, {FieldPath, firebase} from '@react-native-firebase/firestore';
import {
    Text,
    TouchableOpacity,
    View,
    Image,
    ScrollView,
    FlatList,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import {} from 'react-native/Libraries/NewAppScreen';
import styles, {color} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
// import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const dong = '₫';
const seatMoney = 70;
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
            numberOfLines={3}>
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

const HeadingBook = ({selectedButton, setSelectedButton}) => {
    const [buttons, setButtons] = useState([
        {
            content: `Chọn phim / Rạp /  Xuất`,
            style: [styles.bookingTouchOpacity, {width: '24%'}],
            disabled: false,
        },
        {
            content: `Chọn\n ghế `,
            style: styles.bookingTouchOpacity,
            disabled: true,
        },
        {
            content: `Chọn \nthức ăn`,
            style: styles.bookingTouchOpacity,
            disabled: true,
        },
        {
            content: `Xác \nnhận`,
            style: styles.bookingTouchOpacity,
            disabled: true,
        },
    ]);
    useEffect(() => {
        setButtons(prev => {
            return prev.map((button, index) => {
                if (index === selectedButton) {
                    return {
                        ...button,
                        disabled: false,
                    };
                }
                return {
                    ...button,
                };
            });
        });
        // console.log(selectedButton);
    }, [selectedButton]);
    return (
        <View style={styles.bookingHeaderView}>
            {buttons.map((button, index) => (
                <TouchableOpacity
                    style={button.style}
                    // onPress={() => setSelectedButton(index)}
                    disabled={button.disabled}
                    numberOfLines={2}
                    adjustsFontSizeToFit={true}>
                    <BookingHeaderText
                        content={button.content}
                        disabled={button.disabled}
                    />
                    <BookingUnderlineHeader
                        selectedButton={
                            index === selectedButton ? true : false
                        }></BookingUnderlineHeader>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const BookingResult = ({
    cinemaRoom,
    setCinemaRoom,
    film,
    chosenShowTime,
    chosenCinema,
    chosenDate,
}) => {
    let cinemaRoomId = '';
    useEffect(() => {
        if (chosenShowTime === undefined) return;
        cinemaRoomId = chosenShowTime.cinema_room_id;
        const fetchCinemaRoom = async () => {
            let arrCinemaRoom;
            // const cinemaRoom = await firestore()
            //     .collection('cinema-room')
            //     .doc(cinemaRoomId)
            //     .get()
            //     .then(doc => {
            //         if (!doc.data()) return;
            //         arrCinemaRoom = {...doc.data()};
            //     });
            const cinemaRoom = firestore().collection('cinema-room').onSnapshot(querySnapshot => {
                let arrCinemaRoom;
                querySnapshot.docs.map(doc => {
                    if(doc.id === cinemaRoomId){
                        arrCinemaRoom = {...doc.data(), id: doc.id};
                        setCinemaRoom(arrCinemaRoom)
                    }
                });
            });
        };
        fetchCinemaRoom();
    }, [chosenShowTime]);
    return (
        <View>
            <View style={styles.bookingBar}>
                <Text></Text>
            </View>
            <View
                style={[
                    styles.bookingClapperBoardParent,
                    {flexDirection: 'row'},
                ]}>
                <Image
                    source={
                        film === undefined
                            ? require('./assets/imgs/clapperBoard.png')
                            : {uri: film.img}
                    }
                    style={styles.bookingClapperBoard}
                />
                <View style={{marginLeft: 20, width: '50%'}}>
                    <Text
                        style={[
                            styles.bookingClapperBoardTxt,
                            {fontFamily: 'NunitoSans_ExtraBold'},
                        ]}>
                        {film === undefined ? '' : film.title}
                    </Text>
                    <Text style={styles.bookingClapperBoardTxt}>2D Phụ Đề</Text>
                    <Text
                        style={[
                            styles.bookingClapperBoardTxt,
                            {fontFamily: 'NunitoSans_ExtraBold'},
                        ]}>
                        Galaxy Trung Chánh
                    </Text>
                    {cinemaRoom === undefined ? (
                        <Text></Text>
                    ) : (
                        <Text
                            style={
                                styles.bookingClapperBoardTxt
                            }>{`RAP ${cinemaRoom.room_name}`}</Text>
                    )}
                    {chosenShowTime === undefined ? (
                        <Text></Text>
                    ) : (
                        <Text style={styles.bookingClapperBoardTxt}>
                            Suất:
                            <Text style={{fontFamily: 'NunitoSans_ExtraBold'}}>
                                {' '}
                                {chosenShowTime.start_time}
                            </Text>
                        </Text>
                    )}
                    {chosenDate === undefined ? (
                        <Text></Text>
                    ) : (
                        <Text
                            style={[
                                styles.bookingClapperBoardTxt,
                                {fontFamily: 'NunitoSans_ExtraBold'},
                            ]}>
                            {chosenDate.dayInWeek} -{' '}
                            {chosenDate.date + `/` + new Date().getFullYear()}
                        </Text>
                    )}
                </View>
            </View>
        </View>
    );
};
type BookingLocationContentProps = {
    setHeading: React.Dispatch<React.SetStateAction<string>>;
    setLocation: React.Dispatch<React.SetStateAction<string>>;
    setOpenDropDown: React.Dispatch<React.SetStateAction<string>>;
    setIsClicking: React.Dispatch<React.SetStateAction<boolean>>;
};
const BookingLocationContent = (props: BookingLocationContentProps) => {
    const buttons = [
        {content: 'TP Hồ Chí Minh'}, //
        {content: 'Hà Nội'}, //
        {content: 'Đà Nẵng'}, //
        {content: 'Cà Mau'}, //
        {content: 'Khánh Hòa'},
        {content: 'Nghệ An'}, //
    ];
    return (
        <View
            style={[styles.bookingLocationContent, styles.bookingShadowBlock]}>
            {buttons.map((button, index) => (
                <TouchableOpacity
                    style={styles.bookingLocationContentButton}
                    onPress={() => {
                        props.setHeading('Chọn vị trí - ' + button.content);
                        props.setLocation(button.content);
                        props.setOpenDropDown('dropdown2');
                        props.setIsClicking(true);
                    }}>
                    <Text style={styles.bookingLocationContentText}>
                        {button.content}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

//*******************************************************Booking location*******************************************************/
// type BookingLocationProps = {
//     openDropdown: string;
//     setOpenDropdown: React.Dispatch<React.SetStateAction<string>>;
//     setLocation: React.Dispatch<React.SetStateAction<string>>;
//     setIsClicking: React.Dispatch<React.SetStateAction<boolean>>;
// };
// const BookingLocation = (props: BookingLocationProps) => {
//     const [heading, setHeading] = useState('Chọn vị trí');
//     return (
//         <View style={[styles.bookingDropDownParent]}>
//             {/*BUG: just using for sub component, can not use for parent dropdown */}
//             <TouchableOpacity
//                 onPress={() => {
//                     props.setOpenDropdown('dropdown1');
//                 }}
//                 activeOpacity={1}>
//                 <View
//                     style={[
//                         styles.bookingDropDownHeader,
//                         styles.bookingShadowBlock,
//                     ]}>
//                     <BookingHeading content={heading} />
//                     <TouchableOpacity
//                         style={[
//                             styles.bookingDropDownButton,
//                             {
//                                 backgroundColor:
//                                     props.openDropdown === 'dropdown1'
//                                         ? color.button
//                                         : color.background,
//                             },
//                         ]}
//                         onPress={() => {
//                             props.setOpenDropdown('dropdown1');
//                         }}>
//                         <Icon
//                             name={
//                                 props.openDropdown === 'dropdown1'
//                                     ? 'caret-up'
//                                     : 'caret-down'
//                             }
//                             color={
//                                 props.openDropdown === 'dropdown1'
//                                     ? '#ffffff'
//                                     : color.button
//                             }
//                             size={28}
//                         />
//                     </TouchableOpacity>
//                 </View>
//             </TouchableOpacity>

//             {props.openDropdown === 'dropdown1' && (
//                 <BookingLocationContent
//                     setHeading={setHeading}
//                     setLocation={props.setLocation}
//                     setOpenDropDown={props.setOpenDropdown}
//                     setIsClicking={props.setIsClicking}
//                 />
//             )}
//         </View>
//     );
// };
//*******************************************************Booking film*******************************************************/

const ItemFilm = ({
    item,
    index,
    setChosenFilm,
    setHeading,
    setOpenDropDown,
    showTime,
    setShowTime,
    chosenFilm,
}) => {
    const handleClick = async () => {
        setChosenFilm(item);
        setHeading(`Chọn phim - ${item.title}`);
        setOpenDropDown('dropdown3');
    };
    return (
        <TouchableOpacity
            style={{width: screenWidth / 2}}
            onPress={handleClick}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Image source={{uri: item.img}} style={styles.bookingFilmImg} />
            </View>
            <Text
                style={{
                    fontSize: 20,
                    fontFamily: 'NunitoSans_ExtraBold',
                    marginLeft: 10,
                }}>
                {item.title}
            </Text>
        </TouchableOpacity>
    );
};
const BookingFilmContent = ({
    data,
    setChosenFilm,
    setHeading,
    setOpenDropDown,
    chosenFilm,
    setShowTime,
    showTime,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef(null);
    const handlePressForward = () => {
        setCurrentIndex(prevIndex => {
            if (prevIndex === data.length - 1) {
                flatListRef.current?.scrollToIndex({index: 0, animted: true});
                return 0;
            } else {
                flatListRef.current?.scrollToIndex({
                    index: prevIndex + 1,
                    animated: true,
                });
                return prevIndex + 1;
            }
        });
    };

    const handlePressBackward = () => {
        setCurrentIndex(prevIndex => {
            if (prevIndex === 0) {
                flatListRef.current?.scrollToIndex({
                    index: data.length - 1,
                    animated: true,
                });
                return data.length - 1;
            } else {
                flatListRef.current?.scrollToIndex({
                    index: prevIndex - 1,
                    animated: true,
                });
                return prevIndex - 1;
            }
        });
    };
    const renderITem = ({item, index}) => {
        return (
            <ItemFilm
                setOpenDropDown={setOpenDropDown}
                item={item}
                index={index}
                setChosenFilm={setChosenFilm}
                setHeading={setHeading}
                setShowTime={setShowTime}
                showTime={showTime}
                setChosenFilm={setChosenFilm}
            />
        );
    };
    return (
        <View style={[styles.bookingShadowBlock, styles.bookingFilmContent]}>
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.bookingFilmTouchOpacityBackWard}
                onPress={handlePressBackward}>
                <Text style={{textAlign: 'center'}}>
                    <Icon name="angle-up" color="black" size={36} />
                </Text>
            </TouchableOpacity>
            <FlatList
                ref={flatListRef}
                data={data}
                renderItem={renderITem}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                removeClippedSubviews={true}
            />

            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.bookingFilmTouchOpacityForWard}
                onPress={handlePressForward}>
                <Text style={{textAlign: 'center'}}>
                    <Icon name="angle-up" color="black" size={36} />
                </Text>
            </TouchableOpacity>
        </View>
    );
};
type BookingFilmProps = {
    openDropdown: string;
    setOpenDropdown: React.Dispatch<React.SetStateAction<string>>;
    films: any;
    isLoading: boolean;
    isClicking: boolean;
    setChosenFilm: any;
    chosenFilm: any;
    showTime: any;
    setShowTime: any;
};
const BookingFilm = (props: BookingFilmProps) => {
    const [heading, setHeading] = useState('Chọn phim');
    if (props.isLoading && props.isClicking)
        return <ActivityIndicator size="large" color="#0000ff" />;
    return (
        <View style={[styles.bookingDropDownParent]}>
            <TouchableOpacity
                onPress={() => {
                    props.setOpenDropdown('dropdown2');
                }}
                activeOpacity={1}>
                <View
                    style={[
                        styles.bookingDropDownHeader,
                        styles.bookingShadowBlock,
                    ]}>
                    <BookingHeading content={heading} />
                    <TouchableOpacity
                        style={[
                            styles.bookingDropDownButton,
                            {
                                backgroundColor:
                                    props.openDropdown === 'dropdown2'
                                        ? color.button
                                        : color.background,
                            },
                        ]}
                        onPress={() => {
                            props.setOpenDropdown('dropdown2');
                        }}>
                        <Icon
                            name={
                                props.openDropdown === 'dropdown2'
                                    ? 'caret-up'
                                    : 'caret-down'
                            }
                            color={
                                props.openDropdown === 'dropdown2'
                                    ? '#ffffff'
                                    : color.button
                            }
                            size={28}
                        />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
            {props.openDropdown === 'dropdown2' && (
                <BookingFilmContent
                    setShowTime={props.setShowTime}
                    showTime={props.showTime}
                    setOpenDropDown={props.setOpenDropdown}
                    data={props.films}
                    setChosenFilm={props.setChosenFilm}
                    chosenFilm={props.chosenFilm}
                    setHeading={setHeading}
                />
            )}
        </View>
    );
};

//*******************************************************Booking Time*******************************************************/
type BookingTimeProps = {
    openDropdown: string;
    setOpenDropdown: React.Dispatch<React.SetStateAction<string>>;
    setIsClicking: React.Dispatch<React.SetStateAction<boolean>>;
    chosenFilm: string;
    showTime: Array<string>;
    cinemas: any;
    chosenShowTime: any;
    setChosenShowTime: any;
    chosenCinema: any;
    setChosenCinema: any;
    chosenDate: any;
    setChosenDate: any;
};
const BookingTime = (props: BookingTimeProps) => {
    const [heading, setHeading] = useState('Chọn suất');
    return (
        <View style={[styles.bookingDropDownParent]}>
            {/*BUG: just using for sub component, can not use for parent dropdown */}
            <TouchableOpacity
                onPress={() => {
                    props.setOpenDropdown('dropdown3');
                }}
                activeOpacity={1}>
                <View
                    style={[
                        styles.bookingDropDownHeader,
                        styles.bookingShadowBlock,
                    ]}>
                    <BookingHeading content={heading} />
                    <TouchableOpacity
                        style={[
                            styles.bookingDropDownButton,
                            {
                                backgroundColor:
                                    props.openDropdown === 'dropdown3'
                                        ? color.button
                                        : color.background,
                            },
                        ]}
                        onPress={() => {
                            props.setOpenDropdown('dropdown3');
                        }}>
                        <Icon
                            name={
                                props.openDropdown === 'dropdown3'
                                    ? 'caret-up'
                                    : 'caret-down'
                            }
                            color={
                                props.openDropdown === 'dropdown3'
                                    ? '#ffffff'
                                    : color.button
                            }
                            size={28}
                        />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>

            {/* {props.openDropdown === 'dropdown3' && (
            <BookingTimeContent chosenFilm={props.chosenFilm}/>
        )} */}
            {props.chosenFilm === undefined ? (
                <View></View>
            ) : (
                <BookingTimeContent
                    cinemas={props.cinemas}
                    chosenFilm={props.chosenFilm}
                    showTime={props.showTime}
                    chosenShowTime={props.chosenShowTime}
                    setChosenShowTime={props.setChosenShowTime}
                    chosenCinema={props.chosenCinema}
                    setChosenCinema={props.setChosenCinema}
                    chosenDate={props.chosenDate}
                    setChosenDate={props.setChosenDate}
                />
            )}
        </View>
    );
};

const ItemFlatList = ({
    dayInWeek,
    date,
    selectedDate,
    index,
    setSelectedDate,
    chosenDate,
    setChosenDate,
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.bookingTimeButton,
                chosenDate && chosenDate.date === date
                    ? {backgroundColor: color.button}
                    : {},
            ]}
            adjustsFontSizeToFit={true}
            onPress={() => {
                setSelectedDate(index);
                setChosenDate({dayInWeek: dayInWeek, date: date});
                // console.log(chosenDate);
            }}>
            <Text
                style={[
                    {fontSize: 18},
                    chosenDate && chosenDate.date === date
                        ? {color: 'white'}
                        : {color: 'black'},
                ]}>
                {dayInWeek}
            </Text>
            <Text
                style={[
                    {textAlign: 'center'},
                    chosenDate && chosenDate.date === date
                        ? {color: 'white'}
                        : {color: 'black'},
                ]}>
                {date}
            </Text>
        </TouchableOpacity>
    );
};
const BookingTimeContent = ({
    chosenDate,
    setChosenDate,
    chosenCinema,
    setChosenCinema,
    chosenFilm,
    showTime,
    cinemas,
    chosenShowTime,
    setChosenShowTime,
}) => {
    //dataDate have two properties: date and dayInWeek
    const dataDate = useRef([]);
    const [selectedDate, setSelectedDate] = useState(0);
    //how to compare two day with format dd/mm
    const [objDataShowTime, setObjectDataShowTime] = useState([]);
    const isInComingFilm = (date1, date2) => {
        const [day1, month1] = date1.split('/');
        const [day2, month2] = date2.split('/');
        if (month1 > month2) return true;
        if (month1 < month2) return false;
        if (day1 >= day2) return true;
        return false;
    };
    //how to get day in week with format dd/mm
    //@return {Object} {dayInWeek, date} to sunday
    const getDateToSunday = (offset = 0) => {
        const date = new Date();
        date.setDate(date.getDate() + offset);
        const days = [
            'Chủ nhật',
            'Thứ 2',
            'Thứ 3',
            'Thứ 4',
            'Thứ 5',
            'Thứ 6',
            'Thứ 7',
        ];
        const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        const month =
            date.getMonth() + 1 < 10
                ? '0' + (date.getMonth() + 1)
                : date.getMonth() + 1;
        return {
            dayInWeek: offset === 0 ? 'Hôm nay' : days[date.getDay()],
            date: `${day}/${month}`,
        };
    };
    useEffect(() => {
        dataDate.current = [];
        let iOffset = 0;
        do {
            dataDate.current.push(getDateToSunday(iOffset));
            iOffset++;
        } while (getDateToSunday(iOffset).dayInWeek !== 'Thứ 2');
        // cinemas.forEach(cinema => {
        //     objDataShowTime.current.push({
        //         // cinema: cinema,
        //         showTimes: showTime,
        //     });
        // });
        setObjectDataShowTime(showTime);
    }, [showTime]);

    // if(isInComingFilm(chosenFilm.opening_date, getCurrentDate())){
    // return (
    //     <View style={[ styles.bookingShadowBlock, styles.bookingFilmContent ]}>
    //         <Text style={styles.bookingTimeTXTInComing}>
    //             Phim sắp công chiếu vào ngày {'\n'}
    //             {chosenFilm && chosenFilm.opening_date ? chosenFilm.opening_date : ""}
    //         </Text>
    //     </View>
    // );
    // }
    const ilimitItemShow = 3;
    const [sliceCurrent, setSliceCurrent] = useState(0);
    const slicedData = dataDate.current.slice(
        sliceCurrent,
        sliceCurrent + ilimitItemShow,
    );
    const handleBackWard = () => {
        setSliceCurrent(prev => {
            if (prev === 0) return dataDate.current.length - ilimitItemShow;
            return prev - 1;
        });
    };
    const handleForWard = () => {
        setSliceCurrent(prev => {
            if (prev === dataDate.current.length - ilimitItemShow) return 0;
            return prev + 1;
        });
    };
    return (
        <View style={[styles.bookingShadowBlock]}>
            {/* backward */}
            <View style={styles.bookingTimeContent}>
                <TouchableOpacity
                    style={styles.bookingTimeTouchOpacityBackWard}
                    onPress={handleBackWard}>
                    <Text style={{textAlign: 'center'}}>
                        <Icon name="angle-up" color="black" size={36} />
                    </Text>
                </TouchableOpacity>

                <FlatList
                    data={slicedData}
                    renderItem={({item, index}) => (
                        <ItemFlatList
                            index={index}
                            setSelectedDate={setSelectedDate}
                            dayInWeek={item.dayInWeek}
                            date={item.date}
                            selectedDate={selectedDate}
                            chosenDate={chosenDate}
                            setChosenDate={setChosenDate}
                        />
                    )}
                    horizontal={true}
                    contentContainerStyle={styles.bookingTimeContent}
                />

                {/* forward */}
                <TouchableOpacity
                    style={styles.bookingTimeTouchOpacityForWard}
                    onPress={handleForWard}>
                    <Text style={{textAlign: 'center'}}>
                        <Icon name="angle-up" color="black" size={36} />
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Show-time */}
            <View style={styles.bookingTimeItemShowTimeContainer}>
                <View>
                    <Text style={[styles.bookingTimeTXTNormal, {fontSize: 16}]}>
                        2D Phụ Đề
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        width: '50%',
                        flexWrap: 'wrap',
                    }}>
                    {objDataShowTime &&
                        objDataShowTime.map(showTime => (
                            <View>
                                <TouchableOpacity
                                    style={[
                                        styles.bookingTimeButton,
                                        chosenShowTime &&
                                        chosenShowTime.id === showTime.id
                                            ? {backgroundColor: color.button}
                                            : {backgroundColor: color.block},
                                    ]}
                                    onPress={() => {
                                        setChosenShowTime(showTime);
                                        // setChosenCinema(item.cinema);
                                    }}>
                                    <Text
                                        style={[
                                            styles.bookingTimeTXTNormal,
                                            {fontSize: 16},
                                            chosenShowTime &&
                                            chosenShowTime.id === showTime.id
                                                ? {color: 'white'}
                                                : {color: 'black'},
                                        ]}>
                                        {showTime.start_time}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                </View>
            </View>
        </View>
    );
};
const BookingStage1 = ({
    chosenDate,
    setChosenDate,
    chosenCinema,
    setChosenCinema,
    setChosenFilm,
    chosenFilm,
    chosenShowTime,
    setChosenShowTime,
}) => {
    const [location, setLocation] = useState('');
    //array of film include title, img, ...
    const [openDropDown, setOpenDropDown] = useState('dropdown2');

    //contain arr of key cinemas match city when click button location
    const cinemasMatchLocation = useRef([]);
    //contain arr of cinemas name match city when click button location
    const [cinemas, setCinemas] = useState([]);
    //contain arr of key films match city when click button location
    const filmsMatchCinema = useRef([]);

    //get all films match cinema and store in array
    const [films, setFilms] = useState([]);
    //
    const [showTime, setShowTime] = useState([]);
    //loading
    const [loading, setLoading] = useState(true);
    const [isClicking, setIsClicking] = useState(false);
    useEffect(() => {
        //get all cinemas match location
        // const fetchCinemasMatchLocation = async () => {
        //     const cinemas = await firestore()
        //         .collection('cinemas')
        //         .where('city', '==', location)
        //         .get()
        //         .then(querySnapshot => {
        //             const arrKeyCinmemasCity = [];
        //             const arrCinemas = [];
        //             querySnapshot.docs.map(doc => {
        //                 arrKeyCinmemasCity.push(doc.id);
        //                 arrCinemas.push(doc.data().name);
        //             });
        //             setCinemas(arrCinemas);
        //             cinemasMatchLocation.current = arrKeyCinmemasCity;
        //         });
        // };
        // const fetchFilmsMatchCinema = async () => {
        //     const films = await firestore()
        //         .collection('cinemas-films')
        //         .where('cinemas_id', 'in', cinemasMatchLocation.current)
        //         .get()
        //         .then(querySnapshot => {
        //             const arrKeyFilmsMatchCinemas = new Set();
        //             querySnapshot.docs.map(doc =>
        //                 arrKeyFilmsMatchCinemas.add(doc.data().films_id),
        //             );
        //             filmsMatchCinema.current = Array.from(
        //                 arrKeyFilmsMatchCinemas,
        //             );
        //         });
        // };

        const arrFilms = [];
        const fetchFilmsInfor = async () => {
            try {
                //const chunkSize = 30;
                //for (
                //    let i = 0;
                //    i < filmsMatchCinema.current.length;
                //    i += chunkSize
                //) {
                //    const chunk = filmsMatchCinema.current.slice(
                //        i,
                //        i + chunkSize,
                //    );
                //    const querrySnapshot = await firestore()
                //        .collection('films')
                //        .where(
                //            firebase.firestore.FieldPath.documentId(),
                //            'in',
                //            chunk,
                //        )
                //        .get()
                //        .then(querySnapshot => {
                //            querySnapshot.docs.map(doc =>
                //                arrFilms.push({...doc.data(), id: doc.id}),
                //                //arrFilms.push(doc.data()),
                //            );
                //        });
                //}
                // const querrySnapshot = await firestore()
                //     .collection('films')
                //     .where(
                //         firebase.firestore.FieldPath.documentId(),
                //         'in',
                //         filmsMatchCinema.current,
                //     )
                //     .get()
                //     .then(querySnapshot => {
                //         querySnapshot.docs.map(
                //             doc => arrFilms.push({...doc.data(), id: doc.id}),
                //             //arrFilms.push(doc.data()),
                //         );
                //     });
                const querrySnapshot = await firestore()
                    .collection('films')
                    .get()
                    .then(querySnapshot => {
                        querySnapshot.docs.map(doc =>
                            arrFilms.push({...doc.data(), id: doc.id}),
                        );
                    });
                setFilms(arrFilms);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        const fetchData = async () => {
            // await fetchCinemasMatchLocation();
            // await fetchFilmsMatchCinema();
            await fetchFilmsInfor();
        };
        fetchData();
    }, []);
    //**********************FetchShowTime**********************
    useEffect(() => {
        const fetchShowTime = async () => {
            const showTime = await firestore()
                .collection('show-time')
                .where('film_id', '==', chosenFilm.id)
                .get()
                .then(querySnapshot => {
                    let arrShowTime = [];
                    querySnapshot.forEach(doc => {
                        arrShowTime.push({...doc.data(), id: doc.id});
                    });
                    setShowTime(arrShowTime);
                })
                .catch(error => {
                    console.log(error);
                });
        };
        fetchShowTime();
        const fetchData = async () => {
            // await fetchCinemasMatchLocation();
            // await fetchFilmsMatchCinema();
            await fetchShowTime();
        };
    }, [chosenFilm]);
    return (
        <View>
            {/* <BookingLocation
                openDropdown={openDropDown}
                setOpenDropdown={setOpenDropDown}
                setLocation={setLocation}
                setIsClicking={setIsClicking}
            /> */}
            <BookingFilm
                setShowTime={setShowTime}
                showTime={showTime}
                openDropdown={openDropDown}
                setOpenDropdown={setOpenDropDown}
                films={films}
                isLoading={loading}
                isClicking={isClicking}
                chosenFilm={chosenFilm}
                setChosenFilm={setChosenFilm}
            />
            <BookingTime
                chosenShowTime={chosenShowTime}
                setChosenShowTime={setChosenShowTime}
                showTime={showTime}
                openDropdown={openDropDown}
                setOpenDropdown={setOpenDropDown}
                isClicking={isClicking}
                chosenFilm={chosenFilm}
                cinemas={cinemas}
                chosenCinema={chosenCinema}
                setChosenCinema={setChosenCinema}
                chosenDate={chosenDate}
                setChosenDate={setChosenDate}
            />
        </View>
    );
};
const BookingStage1Area = ({
    chosenDate,
    setChosenDate,
    chosenCinema,
    setChosenCinema,
    setChosenFilm,
    chosenFilm,
    chosenShowTime,
    setChosenShowTime,
}) => {
    return (
        <View>
            <BookingStage1
                setChosenFilm={setChosenFilm}
                chosenFilm={chosenFilm}
                chosenShowTime={chosenShowTime}
                setChosenShowTime={setChosenShowTime}
                chosenCinema={chosenCinema}
                setChosenCinema={setChosenCinema}
                chosenDate={chosenDate}
                setChosenDate={setChosenDate}
            />
        </View>
    );
};
const BookingStage2Area = ({cinemaRoom, selectedSeats, setSelectedSeats}) => {
    const iTotalSeats = 100;
    const iTotalColumn = 10;
    const iColumnRightMargin = 3;
    const iColumnLeftMargin = iTotalColumn - 4;
    const seats = useRef([]);
    return (
        <View style={{flexDirection: 'column', backgroundColor: color.block}}>
            {/****************************Seats****************************/}
            <FlatList
                data={cinemaRoom && cinemaRoom.seats}
                renderItem={({item, index}) => {
                    return (
                        <TouchableOpacity
                            style={[
                                styles.bookingSeat,
                                selectedSeats.includes(item.seat) && {
                                    backgroundColor: color.selectedSeat,
                                },
                                item.available === false && {
                                    backgroundColor: color.orange,
                                },
                            ]}
                            disabled={item.available === false}
                            onPress={() => {
                                setSelectedSeats(prev => {
                                    if (prev.includes(item.seat)) {
                                        return prev.filter(
                                            seat => seat !== item.seat,
                                        );
                                    }
                                    return [...prev, item.seat];
                                });
                            }}>
                            <Text>{item.seat}</Text>
                        </TouchableOpacity>
                    );
                }}
                numColumns={iTotalColumn}
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            />
            {/****************************Not seats****************************/}
            <View style={{alignItems: 'center'}}>
                <Text style={{marginTop: 20}}>Màn hình</Text>
                <View
                    style={{
                        width: '90%',
                        backgroundColor: color.orange,
                        height: 5,
                        marginTop: 10,
                    }}>
                    <Text></Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginRight: 10,
                        }}>
                        <View
                            style={[
                                styles.bookingSeat,
                                {backgroundColor: color.selectedSeat},
                            ]}>
                            <Text></Text>
                        </View>
                        <Text>Ghế đang chọn</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View
                            style={[
                                styles.bookingSeat,
                                {backgroundColor: color.orange},
                            ]}>
                            <Text></Text>
                        </View>
                        <Text>Ghế đã bán</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};
const BookingStage3Area = ({selectedCombos, setSelectedCombos}) => {
    const [combos, setCombos] = useState([]);
    const [quantity, setQuantity] = useState([]);
    useEffect(() => {
        const fetchCombos = async () => {
            const combos = await firestore()
                .collection('combos')
                .get()
                .then(querySnapshot => {
                    const arrCombos = [];
                    querySnapshot.forEach(doc => {
                        arrCombos.push({...doc.data(), id: doc.id});
                    });
                    setCombos(arrCombos);
                    setQuantity(Array(arrCombos.length).fill(0));
                    setSelectedCombos(
                        arrCombos.map(combo => {
                            return {...combo, quantity: 0};
                        }),
                    );
                });
        };
        fetchCombos();
    }, []);
    return (
        <FlatList
            data={combos}
            renderItem={({item, index}) => (
                <View style={styles.bookingComboContainerItem}>
                    <Image
                        source={{uri: item.img}}
                        style={styles.bookingComboImg}
                    />

                    <View style={[styles.bookingComboContainerTXT]}>
                        <View style={{width: '70%'}}>
                            <Text style={styles.bookingComboTXTBig}>
                                {item.title}
                            </Text>

                            <Text style={{marginVertical: 5}}>
                                {item.description}
                            </Text>
                            <View>
                                <Text style={styles.bookingComboTXTBig}>
                                    Giá: {item.money + '.000'} ₫
                                </Text>
                                <View
                                    style={
                                        styles.bookingComboContainerIncreDecre
                                    }>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setQuantity(prev => {
                                                const newQuantity = [...prev];
                                                if (newQuantity[index] !== 0)
                                                    newQuantity[index]--;
                                                return newQuantity;
                                            });
                                            setSelectedCombos(prev => {
                                                if (quantity[index] === 0)
                                                    return prev;
                                                const newCombos = [...prev];
                                                newCombos.splice(index, 1, {
                                                    ...item,
                                                    quantity:
                                                        quantity[index] - 1,
                                                });
                                                return newCombos;
                                            });
                                        }}
                                        style={styles.bookingComboButton}>
                                        <Text style={styles.bookingComboSign}>
                                            -
                                        </Text>
                                    </TouchableOpacity>
                                    <Text style={styles.bookingComboQuantity}>
                                        {quantity[index]}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setQuantity(prev => {
                                                const newQuantity = [...prev];
                                                newQuantity[index]++;
                                                return newQuantity;
                                            });
                                            setSelectedCombos(prev => {
                                                const newCombos = [...prev];
                                                newCombos.splice(index, 1, {
                                                    ...item,
                                                    quantity:
                                                        quantity[index] + 1,
                                                });
                                                return newCombos;
                                            });
                                        }}
                                        style={styles.bookingComboButton}>
                                        <Text style={styles.bookingComboSign}>
                                            +
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            )}
            contentContainerStyle={{backgroundColor: color.block}}
        />
    );
};
const BookingStage4Area = ({totalMoney}) => {
    return (
        <View style={{alignItems: 'center', marginVertical: 20}}>
            <Icon name="check-circle" size={100} color={color.button} />
            <Text style={styles.bookingFooterTXT}>
                Bạn chắc chắn muốn xác nhận thanh toán
            </Text>
            <Text style={styles.bookingFooterTXT}>
                <Text style={styles.bookingFooterTXT}>
                    Tổng cộng:{' '}
                    <Text
                        style={[
                            styles.bookingFooterTXT,
                            {color: color.orange},
                        ]}>
                        {totalMoney + '.000'} ₫
                    </Text>
                </Text>
            </Text>
        </View>
    );
};
const App = () => {
    const [selectedButton, setSelectedButton] = useState(0);
    const [totalMoney, setTotalMoney] = useState(0);
    const [chosenFilm, setChosenFilm] = useState(undefined);
    const [chosenShowTime, setChosenShowTime] = useState(undefined);
    const [chosenDate, setChosenDate] = useState(undefined);
    //object
    const [cinemaRoom, setCinemaRoom] = useState(undefined);

    //subtract
    const [chosenCinema, setChosenCinema] = useState(undefined);

    const [selectedSeats, setSelectedSeats] = useState([]);
    const [selectedCombos, setSelectedCombos] = useState([]);
    useEffect(() => {
        if (selectedSeats) {
            setTotalMoney(selectedSeats.length * seatMoney);
        }
        if (selectedCombos) {
            selectedCombos.forEach(combo => {
                setTotalMoney(prev => prev + combo.quantity * combo.money);
            });
        }
    }, [selectedSeats, selectedCombos]);
    useEffect(() => {
        // console.log(selectedCombos);
        // console.log(selectedSeats);
        // console.log(chosenShowTime);
        // console.log(cinemaRoom)
    },[selectedCombos, selectedSeats, chosenShowTime, cinemaRoom]);
    const handleConfirmation = () => {
        if (selectedButton === 3) {
            const sendBookingUser = async () => {
                const booking = await firestore()
                    .collection('bill')
                    .add({
                        user_id: '1',
                        show_time_id: chosenShowTime.id,
                        date: chosenDate.date,
                        seats: selectedSeats,
                        combos: selectedCombos.map(combo => {
                            return {
                                combo_id: combo.id,
                                quantity: combo.quantity,
                            };
                        }),
                        paymen_amount: totalMoney,
                    })
                    .then(() => {
                        console.log('Booking success');
                        alert('Booking success');
                    })
                    .catch(error => {
                        console.log(error);
                    });
            };
            const changeSeatStatus = async () => {
                const seats = await firestore()
                    .collection('cinema-room')
                    .where(firebase.firestore.FieldPath.documentId(), '==', chosenShowTime.cinema_room_id)
                    .get()
                    .then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                            const arrSeats = doc.data().seats;
                            selectedSeats.forEach(seat => {
                                const index = doc.data().seats.findIndex(item => item.seat === seat);
                                arrSeats[index].available = false;
                            });
                            doc.ref.update({seats: arrSeats});
                        });
                    });
            }
            sendBookingUser();
            changeSeatStatus();
        }
    };
    return (
        <View style={{flex: 1}}>
            <ScrollView style={styles.bookingBody}>
                <HeadingBook
                    selectedButton={selectedButton}
                    setSelectedButton={setSelectedButton}
                />
                <BookingResult
                    film={chosenFilm}
                    chosenShowTime={chosenShowTime}
                    chosenCinema={chosenCinema}
                    chosenDate={chosenDate}
                    cinemaRoom={cinemaRoom}
                    setCinemaRoom={setCinemaRoom}
                />
                {selectedButton === 0 && (
                    <BookingStage1Area
                        setChosenFilm={setChosenFilm}
                        chosenFilm={chosenFilm}
                        chosenShowTime={chosenShowTime}
                        setChosenShowTime={setChosenShowTime}
                        chosenCinema={chosenCinema}
                        setChosenCinema={setChosenCinema}
                        setChosenDate={setChosenDate}
                        chosenDate={chosenDate}
                    />
                )}
                {selectedButton === 1 && (
                    <BookingStage2Area
                        cinemaRoom={cinemaRoom}
                        setSelectedSeats={setSelectedSeats}
                        selectedSeats={selectedSeats}
                    />
                )}
                {selectedButton === 2 && (
                    <BookingStage3Area
                        selectedCombos={selectedCombos}
                        setSelectedCombos={setSelectedCombos}
                    />
                )}
                {selectedButton === 3 && (
                    <BookingStage4Area totalMoney={totalMoney} />
                )}
            </ScrollView>
            {/**************************footer**************************/}
            {chosenDate && chosenShowTime && chosenFilm && (
                <View style={[styles.bookingFooterContainer]}>
                    {/********************************** line bar**********************************/}
                    <TouchableOpacity activeOpacity={1}>
                        <View style={styles.bookingFooterLineContainer}>
                            <View style={styles.bookingFooterLine}>
                                <Text></Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {/**********************************Content**********************************/}
                    <View>
                        {selectedSeats.length === 0 ? (
                            <View></View>
                        ) : (
                            <View style={styles.bookingFooterContent}>
                                <View
                                    style={{
                                        width: '70%',
                                        flexWrap: 'wrap',
                                        flexDirection: 'row',
                                    }}>
                                    <Text style={styles.bookingFooterTXT}>
                                        <Text
                                            style={[
                                                styles.bookingFooterTXT,
                                                {
                                                    fontFamily:
                                                        'NunitoSans_ExtraBold',
                                                },
                                            ]}>
                                            {selectedSeats.length}x
                                        </Text>
                                        <Text style={styles.bookingFooterTXT}>
                                            {' '}
                                            Ghế đơn
                                        </Text>
                                        <Text
                                            style={[
                                                styles.bookingFooterTXT,
                                                {
                                                    fontFamily:
                                                        'NunitoSans_ExtraBold',
                                                },
                                            ]}>
                                            {'\nGhế: ' +
                                                selectedSeats.join(', ')}
                                        </Text>
                                    </Text>
                                </View>
                                <Text
                                    style={[
                                        styles.bookingFooterTXT,
                                        {fontFamily: 'NunitoSans_ExtraBold'},
                                    ]}>
                                    {selectedSeats.length * seatMoney + '.000 '}{' '}
                                    ₫
                                </Text>
                            </View>
                        )}
                        {selectedCombos.map(
                            combo =>
                                combo.quantity !== 0 && (
                                    <View style={styles.bookingFooterContent}>
                                        <View
                                            style={{
                                                width: '70%',
                                                flexWrap: 'wrap',
                                                flexDirection: 'row',
                                            }}>
                                            <Text
                                                style={styles.bookingFooterTXT}>
                                                <Text
                                                    style={[
                                                        styles.bookingFooterTXT,
                                                        {
                                                            fontFamily:
                                                                'NunitoSans_ExtraBold',
                                                        },
                                                    ]}>
                                                    {combo.quantity}x
                                                </Text>
                                                <Text
                                                    style={
                                                        styles.bookingFooterTXT
                                                    }>
                                                    {' '}
                                                    {combo.title}
                                                </Text>
                                            </Text>
                                        </View>
                                        <Text
                                            style={[
                                                styles.bookingFooterTXT,
                                                {
                                                    fontFamily:
                                                        'NunitoSans_ExtraBold',
                                                },
                                            ]}>
                                            {combo.quantity * combo.money +
                                                '.000'}{' '}
                                            ₫
                                        </Text>
                                    </View>
                                ),
                        )}
                    </View>
                    {/**********************************total money and button**********************************/}
                    <View
                        style={[styles.bookingFooterTitle, {marginBottom: 20}]}>
                        <View>
                            <Text numberOfLines={1}>
                                <Text style={styles.bookingFooterTXT}>
                                    Tổng cộng:{' '}
                                </Text>
                                <Text
                                    style={[
                                        styles.bookingFooterTXT,
                                        {color: color.orange},
                                    ]}>
                                    {totalMoney + '.000'} ₫
                                </Text>
                            </Text>
                        </View>
                        <View style={[styles.bookingFooterContainerButton]}>
                            <TouchableOpacity
                                onPress={
                                    selectedButton === 0
                                        ? () => {}
                                        : () =>
                                              setSelectedButton(
                                                  prev => prev - 1,
                                              )
                                }>
                                <Text
                                    style={[
                                        styles.bookingFooterTXT,
                                        {color: color.orange},
                                    ]}>
                                    Quay lại
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    handleConfirmation();
                                    if (selectedButton === 3) return;
                                    if (
                                        selectedSeats.length === 0 &&
                                        selectedButton === 1
                                    )
                                        return;
                                    setSelectedButton(prev => prev + 1);
                                }}>
                                <View
                                    style={
                                        styles.bookingFooterButtonBackground
                                    }>
                                    <Text
                                        style={[
                                            styles.bookingFooterTXT,
                                            {color: color.block},
                                        ]}>
                                        Tiếp tục
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
};
export default App;
