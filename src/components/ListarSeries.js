import React, { Component } from 'react';
import { AsyncStorage, Button, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { db, fb } from '../../utils/Firebase';

export default class ListarSeries extends Component {
    static navigationOptions = {
        title: 'Develop By: William Barrilli',
        headerTintColor: '#fff',
        headerRight: (
            <View style={{ marginRight: 15 }}>
                <Button
                    onPress={() => {
                        fb.auth()
                            .signOut()
                            .then(async () => {
                                await AsyncStorage.removeItem('senha')
                                _this.props.navigation.navigate('Login')
                            })
                    }}
                    title="Sair"
                    color="grey"
                    testID='headerRightButton'
                    accessibilityLabel="Right button!"
                />
            </View>
        ),
    };

    constructor() {
        super()
        this.state = {
            series: [],
            change: ""
        }
    }
    deletePedidos(item) {
        let itemId = item.id
        fb.database()
            .ref(`/seriesDB/series/${itemId}`)
            .remove()
        this.listPedidos()
    }
    readPedidos() {
        db.ref(`/seriesDB/series/`)
            .on('value', snapchot => {
                if (snapchot.val() != null) {
                    this.setState(
                        {
                            series: Object.entries(snapchot.val())
                                .map(item => ({ ...item[1], id: item[0] }))
                            , carregando: false
                        })
                }
            })
    }

    listPedidos() {
        let series = this.state.series;
        if (series.length == 0) {
            return <View style={styles.titleText}>
                <Text >
                    Nenhuma Serie cadastrada!
            </Text>
            </View>
        }
        else if (series) {
            return Object.values(series).map(item => (
                <View style={styles.flatview}>
                    <View style={styles.titleText}>
                        <Text >
                            Titulo: {item.titulo}
                        </Text>
                        <Text >
                            Genêro: {item.genero}
                        </Text>
                        <Text >
                            Nota: {item.nota}
                        </Text>
                        <Text >
                            Descricao: {item.descricao}
                        </Text>
                    </View>
                    <View>
                        <Button
                            title={"Visualizar"}
                            color='rgb(0, 255, 0)'
                            onPress={() => this.props.navigation.navigate('Serie', {
                                serieId: item.id
                              })} />
                    </View>
                    <View>
                        <Button
                            title={"Deletar Pedido"}
                            color='rgb(255, 0, 0)'
                            onPress={() => {
                                this.deletePedidos(item)
                            }} />
                    </View>
                </View>
            ))
        }
    }

    componentDidMount() {
        this.readPedidos();
        this.listPedidos();
        _this = this;
    }
    render() {
        const listPedidos = this.listPedidos();
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.button}>
                        <Button
                            title="Adicionar Nova Serie"
                            onPress={() => {
                                this.props.navigation.navigate('CadastraSeries')
                            }} />
                    </View>

                    {listPedidos}
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        margin: 10,

    },
    input: {
        margin: 20,
        marginTop: 15,
        marginVertical: 5,
        borderWidth: 0.5
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    text: {
        fontWeight: 'bold',
        margin: 20,
        marginTop: 15,
        marginVertical: 5,

    },
    button: {
        paddingTop: 5,
        // marginLeft: ,
        marginRight: 40,

    },
    flatview: {
        paddingTop: 5,
        paddingLeft: 0,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#c3c9cc',
        width: '90%',
        // marginLeft: "5%",
        // marginRight: "5%",
        marginTop: 10,
    },
    flatItens: {
        marginTop: 10,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#c3c9cc',
    },
});