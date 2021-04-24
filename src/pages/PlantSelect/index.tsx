import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { PlantProps } from './../../libs/storage';

import { Header } from '../../components/Header';
import { EnviromentButton } from './../../components/EnviromentButton/index';
import { PlantCardPrimary } from './../../components/PlantCardPrimary/index';
import { Load } from '../../components/Load';

import api from '../../services/api';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

interface EnviromentsProps {
    key: string,
    title: string
}

export function PlantSelect() {
    const [enviroments, setEnviroments] = useState<EnviromentsProps[]>();
    const [plants, setPlants] = useState<PlantProps[]>();
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>();
    const [enviromentSelected, setEnviromentSelected] = useState('all');
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [loadMore, setLoadMore] = useState(false);
    const [loadedAll, setLoadedAll] = useState(false);

    const navigation = useNavigation();

    function handleEnviromentalSelected(enviroment: string) {
        setEnviromentSelected(enviroment);

        if(enviroment == 'all')
            return setFilteredPlants(plants);

        const filtered = plants?.filter(plant => (
            plant.environments.includes(enviroment)
        ));

        setFilteredPlants(filtered);
    }

    async function fetchPlants(){
        const {data} = await api.get<PlantProps[]>(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);

        if(data.length == 0){
            setLoadMore(false);
            setLoadedAll(true);
            return;
        }

        if(data.length < 8)
            setLoadedAll(true);

        if(page > 1){
            setPlants(oldValue => [...oldValue, ...data]);
            setFilteredPlants(oldValue => [...oldValue, ...data])
        }else{
            setPlants(data);
            setFilteredPlants(data);
        }

        setLoading(false);
        setLoadMore(false);
    }

    function handleFetchMore(distance: number){
        if(distance < 1 || loadedAll)
            return;

        setLoadMore(true);
        setPage(oldValue => oldValue + 1);
        fetchPlants();
    }

    function handlePlantSelect(plant: PlantProps) {
        navigation.navigate('PlantSave', {plant});
    }

    useEffect(() => {
        async function fetchEnviromental(){
            const {data} = await api
                .get('plants_environments?_sort=title&_order=asc');
            setEnviroments([{key: 'all', title: 'Todos'}, ...data]);
        }

        fetchEnviromental();
    }, [])

    useEffect(() => {
        fetchPlants();
    },[]);

    if(loading)
        return <Load />

    return (
        <View style={styles.container}>
            <View style={styles.header} >
                <Header />

                <Text style={styles.title}>
                    Em qual ambiente
                </Text>
                <Text style={styles.subtitle}>
                    você quer colocar sua planta
                </Text>

            </View>

            <View>
                <FlatList
                    data={enviroments}
                    keyExtractor={(item) => String(item.key)}
                    renderItem={({ item }) => (
                        <EnviromentButton
                            title={item.title}
                            active={item.key == enviromentSelected}
                            onPress={() => handleEnviromentalSelected(item.key)}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator = {false}
                    contentContainerStyle = {styles.enviromentList}
                />
            </View>

            <View style={styles.plants}>
                <FlatList
                    data={filteredPlants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({item}) => (
                        <PlantCardPrimary 
                            data={item} 
                            onPress={() => {
                                handlePlantSelect(item);
                            }}
                        />
                    )}
                    showsVerticalScrollIndicator = {false}
                    numColumns={2}
                    onEndReachedThreshold={0.1}
                    onEndReached={({distanceFromEnd}) => handleFetchMore(distanceFromEnd)}
                    ListFooterComponent={
                        loadMore && <ActivityIndicator color={colors.green} />
                    }
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },

    header: {
        paddingHorizontal: 30,
    },

    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15,
    },

    subtitle: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.text,
        lineHeight: 20,
    },

    enviromentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32
    },

    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    },
})
