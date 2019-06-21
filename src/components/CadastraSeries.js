import React, { Component } from 'react';
import { Slider, Button, StyleSheet, View, Text } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { db, fb } from '../../utils/Firebase';

export default class CadastraProduto extends Component {

    constructor() {
        super()
        this.state = {
            titulo: "",
            genero: "",
            nota: 0,
            descricao: ""
        }
    };

    alerta(msg) {
        alert(msg)
    }

    newItem() {
        const { titulo, genero, nota, descricao } = this.state

        const item = { titulo, genero, nota, descricao }
        db.ref(`/seriesDB/series/`)
            .push(item)
        this.alerta("Serie Adicionada com Sucesso!")
        this.props.navigation.navigate('ListarSeries')
        this.setState({
            titulo: "",
            genero: "",
            nota: "",
            descricao: ""
        })
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <TextInput
                        style={styles.caixaTexto}
                        value={this.state.titulo}
                        onChangeText={titulo => {
                            this.setState({ titulo })
                        }}
                        placeholder="Titulo"
                    />
                    <TextInput
                        style={styles.caixaTexto}
                        value={this.state.genero}
                        onChangeText={genero => {
                            this.setState({ genero })
                        }}
                        placeholder="Genêro"
                    />
                    <Text >
                        Nota : {this.state.nota}
                    </Text>
                    <Slider
                        maximumValue={100}
                        minimumValue={0}
                        step={1}
                        value={this.state.nota}
                        onValueChange={nota => this.setState({ nota })}
                    />
                    <TextInput
                        style={styles.caixaTexto}
                        value={this.state.descricao}
                        onChangeText={descricao => {
                            this.setState({ descricao })
                        }}
                        placeholder="Descrição"
                    />

                    <Button
                        style={styles.botoes}
                        title="Adicionar Serie"
                        onPress={() => {
                            this.newItem()
                        }} />
                </ScrollView>
            </View>
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
    text: {
        margin: 20,
        marginTop: 15,
        marginVertical: 5,
    },
    button: {
        // position: 'absolute',
        backgroundColor: '#003399',
        left: 10,
        right: 20,
        bottom: 5
    },
    caixaTexto: {
        marginLeft: 30,
        marginTop: 30,
        alignItems: 'center',
        borderWidth: 1,
        width: "80%",
        borderBottomColor: "gray",
        borderLeftColor: "white",
        borderRightColor: "white",
        borderTopColor: "white",
    },
    botoes: {
        alignItems: "center",
        marginLeft: 3,
        marginTop: 50
    },
});