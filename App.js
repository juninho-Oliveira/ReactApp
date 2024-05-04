import { StatusBar } from "expo-status-bar";
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import ViaCepLogo from "./assets/ViaCepLogo.jpg";
import { useEffect, useState } from "react";
import { api } from './axios'

export default function App() {

  const [cepInformado, setCepInformado] = useState("");
  const [logradouro, setLogradouro] = useState("")
  const [bairro, setBairro] = useState("")
  const [cidade, setCidade] = useState("")
  const [uf, setUf] = useState("")
  

  console.log(cepInformado)

  async function handlesCepSelected () {

    try {
      const response = await api.get(`${cepInformado}/json`)

      setLogradouro(response.data.logradouro)
      setBairro(response.data.bairro)
      setCidade(response.data.localidade)
      setUf(response.data.uf)

      //console.log(response)

    } catch (error) {
      //console.log(error);
    }
      
  }

  useEffect(()=>{
    handlesCepSelected();
  }, [cepInformado])
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Image
        style={{ position: "absolute", top: 40, flex: 1 }}
        source={ViaCepLogo}
      />

      <View style={styles.containerInfos}>
      
      <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.textStyle}>Nome:</Text>
        <TextInput
          placeholder="Informe o seu Nome..."
          style={styles.inputStyle}
        />

        <Text style={styles.textStyle}>Cep:</Text>
        <TextInput
          placeholder="Informe o seu Cep..."
          style={styles.inputStyle}
          keyboardType="numeric"
          onChangeText={(txt) => setCepInformado(txt)}
        />

        <Text style={styles.textStyle}>Endereço:</Text>
        <TextInput
          placeholder="Informe o seu Endereço..."
          style={styles.inputStyle}
          value={logradouro}
        />

        <Text style={styles.textStyle}>Numero:</Text>
        <TextInput
          placeholder="Informe o seu Numero..."
          style={styles.inputStyle}
          keyboardType="numeric"
        />

        <Text style={styles.textStyle}>Bairro:</Text>
        <TextInput
          placeholder="Informe o seu Bairro..."
          style={styles.inputStyle}
          value={bairro}
        />

        <Text style={styles.textStyle}>Cidade:</Text>
        <TextInput
          placeholder="Informe a sua Cidade..."
          style={styles.inputStyle}
          value={cidade}
        />

        <Text style={styles.textStyle}>UF:</Text>
        <TextInput
          placeholder="Informe a sua UF..."
          style={styles.inputStyle}
          value={uf}
          
        />
      </ScrollView>


      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  containerInfos: {
    flex: 1,
    width: "90%",
    height: "60%",
    marginTop: 250,
  },
  inputStyle: {
    borderWidth: 2,
    padding: 10,
    borderRadius: 8,
    borderColor: "#417B35",
    marginTop: 10,
    marginBottom: 10,
  },
  textStyle: {
    fontSize: 16,
    color: '#417b35'
  }
});
