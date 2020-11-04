import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { DISHES } from '../shared/dishes';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import { Card, Image, ListItem } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

interface IHomeState {
    dishes: typeof DISHES,
    promotions: typeof PROMOTIONS,
    leaders: typeof LEADERS
    // id: number;
    // name: string;
    // image: string;
    // category: string;
    // label: string;
    // price: string;
    // featured: boolean;
    // description: string;
}

const mapStateToProps = (state: any) => {
    return {
        dishes: state.dishesReducer,
        promotions: state.promotionsReducer,
        leaders: state.leadersReducer
    }
};

interface IRenderItem {
    item: typeof LEADERS[0] | typeof PROMOTIONS[0] | typeof DISHES[0],
    isLoading: boolean,
    errMess: any,
}

class RenderItem extends Component<IRenderItem> {
    render() {
        if (this.props.isLoading) {
            return (<Loading />);
        } else if (this.props.errMess) {
            return (<Text>{this.props.errMess}</Text>);
        } else {
            const item = this.props.item;
            if (item != null) {
                return (
                    <Card>
                        <Image source={{ uri: baseUrl + item.image }} style={{ width: '100%', height: 100, flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Card.FeaturedTitle>{item.name}</Card.FeaturedTitle>
                            <Card.FeaturedSubtitle>{item.designation}</Card.FeaturedSubtitle>
                        </Image>
                        <Text style={{ margin: 10 }}>{item.description}</Text>
                    </Card>
                );
            }
            return (<View />);
        }
    }
}
interface IHomeProps {
    dishes: any,
    promotions: any,
    leaders: any,
}
class HomeComponent extends Component<IHomeProps, IHomeState> {
    constructor(props: any) {
        super(props)
        // this.state = {
        //     dishes: DISHES,
        //     promotions: PROMOTIONS,
        //     leaders: LEADERS
        // }
    }
    render() {

        // console.log(this.props.promotions.promotions)

        return (
            <ScrollView>
                <RenderItem
                    item={this.props.dishes.dishes.filter((dish: any) => dish.featured === true)[0]}
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess} />
                <RenderItem
                    item={this.props.promotions.promotions.filter((promo: any) => promo.featured === true)[0]}
                    isLoading={this.props.promotions.isLoading}
                    errMess={this.props.promotions.errMess} />
                <RenderItem
                    item={this.props.leaders.leaders.filter((leader: any) => leader.featured === true)[0]}
                    isLoading={this.props.leaders.isLoading}
                    errMess={this.props.leaders.errMess} />
            </ScrollView>
        );
    }

    // buildName(listName:string){
    //     return (
    //         <Text>{}</Text>
    //     )
    // }

    buildCardList(dish: Array<any>, listName: string, isLoading: boolean, errorMessges: any) {
        return (
            <FlatList data={dish}

                ListHeaderComponent={<Text style={{ textAlign: 'center' }}>{listName}</Text>}
                scrollEnabled={false}
                renderItem={({ item, index }) => {
                    var eachItem: RenderItem = item;
                    return this.buildCard(eachItem, isLoading, errorMessges);
                }}>
            </FlatList>
        )
    }

    buildCard(item: any, isLoading: boolean, errorMessges: any) {
        return (
            <RenderItem item={item} isLoading={isLoading} errMess={errorMessges}></RenderItem>
        );
    }

}

export default connect(mapStateToProps)(HomeComponent)