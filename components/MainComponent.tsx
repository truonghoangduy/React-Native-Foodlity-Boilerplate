import React from 'react';
import { Component } from 'react'
import { Linking, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Menu from '../components/MenuComponent'
import DishDetail from './DishdetailComponent';
import HomeComponent from './HomeComponent'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import ContactUsComponent from './ContactComponent';
import AboutUsComponent from './AboutComponent';
import { Icon, Image } from 'react-native-elements';
import ReservationComponent from './ReservationComponent';

// redux
import { connect } from 'react-redux';
import { fetchComments, fetchLeaders, fetchDishes, fetchPromos } from '../redux/ActionCreator';

const mapStateToProps = (state: any) => {
    return {
        leaders: state.leaders
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    fetchLeaders: () => dispatch(fetchLeaders()),
    fetchComments: () => dispatch(fetchComments()),
    fetchDishes: () => dispatch(fetchDishes()),
    fetchPromos: () => dispatch(fetchPromos())
})



// Drawer Hold Stack 😂


// IMPORT COMPONENT

// options={({ navigation }) => ({
//     headerTitle: 'Menu',
//     headerLeft: () => (<Icon name="menu" size={36} color='#fff' onPress={() => navigation.toggleDrawer()}></Icon>)
// }
// )}
const MainNavigator = createDrawerNavigator();
function MainNavigatorScreen() {
    return (
        <MainNavigator.Navigator initialRouteName="Reservation" drawerContent={props => <CustomDrawerContent {...props}></CustomDrawerContent>}>
            <MainNavigator.Screen
                name="Home"
                component={HomeNavigationScreen}
                options={{
                    title: 'Home',
                    drawerIcon: ({ focused, size }) => (<Icon name="home" size={size} color={focused ? '#7cc' : '#ccc'}></Icon>)
                }}

            ></MainNavigator.Screen>
            <MainNavigator.Screen name="Menu"
                component={MenuNavigatorScreen}
                options={{
                    title: 'Menu',
                    drawerIcon: ({ focused, size }) => (<Icon name="menu" size={size} color={focused ? '#7cc' : '#ccc'}></Icon>)
                }}
            ></MainNavigator.Screen>
            <MainNavigator.Screen
                name="Contact"
                component={ContactUsNavigationScreen}
                options={{
                    title: 'Contact',
                    drawerIcon: ({ focused, size }) => (<Icon name="contacts" size={size} color={focused ? '#7cc' : '#ccc'}></Icon>)
                }}
            ></MainNavigator.Screen>
            <MainNavigator.Screen
                name="About"
                component={AboutUsNavigationScreen}
                options={{
                    title: 'About Us ❤️',
                    drawerIcon: ({ focused, size }) => (<Icon name="info" size={size} color={focused ? '#7cc' : '#ccc'}></Icon>)
                }}
            ></MainNavigator.Screen>

            <MainNavigator.Screen
                name="Reservation"
                component={ReservationNavigatorScreen}
                options={{
                    title: 'Reserve Table',
                    drawerIcon: ({ focused, size }) => (<Icon name='cutlery' type='font-awesome' size={size} color={focused ? '#7cc' : '#ccc'} />)
                }}
            ></MainNavigator.Screen>
        </MainNavigator.Navigator>
    )
}

function CustomDrawerContent(props: any) {
    return (<DrawerContentScrollView {...props}>
        <View style={{ backgroundColor: '#7cc', height: 80, alignItems: "center", flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
                <Image source={require('./images/logo.png')} style={{ margin: 10, width: 80, height: 60 }}></Image>
            </View>
            <View style={{ flex: 2 }}>
                <Text style={{ color: '#fff', fontSize: 22, fontWeight: 'bold' }}>truonghoangduy ✨ & Friend</Text>
            </View>
        </View>
        <DrawerItemList {...props}></DrawerItemList>
        <DrawerItem label="Help"
            onPress={() => Linking.openURL("www.google.com")}
            icon={({ focused, color, size }) => {
                return (<Icon name='help' size={size} color={focused ? '#7cc' : '#ccc'}></Icon>)
            }
            }></DrawerItem>
        <DrawerItem label="Log out"
            onPress={() => Linking.openURL("www.google.com")}
            icon={({ focused, color, size }) => {
                return (<Icon name='lock' size={size} color={focused ? '#7cc' : '#ccc'}></Icon>)
            }
            }></DrawerItem>
    </DrawerContentScrollView>)
}


const ReservationNavigation = createStackNavigator();
function ReservationNavigatorScreen() {
    return (
        <ReservationNavigation.Navigator initialRouteName='Reservation' screenOptions={{
            headerStyle: { backgroundColor: '#7cc' },
            headerTintColor: '#fff',
            headerTitleStyle: { color: '#fff' }
        }}>
            <ReservationNavigation.Screen
                name='Reservation'
                component={ReservationComponent}
                options={({ navigation }) => ({
                    headerTitle: 'Reservation',
                    headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
                })}
            ></ReservationNavigation.Screen>

        </ReservationNavigation.Navigator >
    )
}

const AboutUsNavigation = createStackNavigator();
function AboutUsNavigationScreen() {
    return (
        <AboutUsNavigation.Navigator
            initialRouteName="About"
            screenOptions={{
                headerStyle: { backgroundColor: "#512DA8" },
                headerTintColor: "#fff",
                headerTitleStyle: { color: "#fff" },
            }}
        >
            <AboutUsNavigation.Screen
                name="About"
                component={AboutUsComponent}
                options={({ navigation }) => ({
                    headerTitle: 'About',
                    headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
                })}
            ></AboutUsNavigation.Screen>
        </AboutUsNavigation.Navigator>
    );
}



const ContactUsNavigation = createStackNavigator();
function ContactUsNavigationScreen() {
    return (
        <ContactUsNavigation.Navigator
            initialRouteName="Contact"
            screenOptions={{
                headerStyle: { backgroundColor: "#512DA8" },
                headerTintColor: "#fff",
                headerTitleStyle: { color: "#fff" },
            }}
        >
            <ContactUsNavigation.Screen
                name="Contact"
                component={ContactUsComponent}
                options={({ navigation }) => ({
                    headerTitle: 'Contact',
                    headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
                })}
            ></ContactUsNavigation.Screen>
        </ContactUsNavigation.Navigator>
    );
}




const HomeNavigation = createStackNavigator();
function HomeNavigationScreen() {
    return (
        <HomeNavigation.Navigator initialRouteName="Home">
            <MainNavigator.Screen name="Home" component={HomeComponent}
            ></MainNavigator.Screen>
        </HomeNavigation.Navigator>
    )
}



const MenuNavigator = createStackNavigator();
function MenuNavigatorScreen() {
    return (
        <MenuNavigator.Navigator
            initialRouteName="Menu"
            screenOptions={{
                headerStyle: { backgroundColor: '#512DA8' },
                headerTintColor: '#fff',
                headerTitleStyle: { color: '#fff' }
            }}>
            <MenuNavigator.Screen name={"Menu"} component={Menu}
                options={({ navigation }) => ({
                    headerTitle: 'Menu',
                    headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
                })}
            ></MenuNavigator.Screen>
            <MenuNavigator.Screen name={"Dishdetail"} component={DishDetail}
                options={({ navigation }) => ({
                    headerTitle: 'Dishdetail',
                    headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
                })}
            ></MenuNavigator.Screen>
        </MenuNavigator.Navigator>
    );
}

interface IMainProps {
    fetchLeaders(): void
    fetchComments(): void
    fetchDishes(): void
}

class Main extends Component {
    componentDidMount() {
        // @ts-ignore
        this.props.fetchLeaders();
        //@ts-ignore
        this.props.fetchComments();
        // @ts-ignore

        this.props.fetchDishes();
        // @ts-ignore
        this.props.fetchPromos();
    }
    render() {
        return (
            <NavigationContainer>
                <MainNavigatorScreen></MainNavigatorScreen>
            </NavigationContainer>
        );
    }
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
// });


// export default connect(mapStateToProps, mapDispatchToProps)(Main)

export default connect(null, mapDispatchToProps)(Main);

