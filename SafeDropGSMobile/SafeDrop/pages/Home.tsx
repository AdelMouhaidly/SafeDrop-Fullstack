import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons, Entypo } from '@expo/vector-icons';

export default function Home({ navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.tituloContainer}>
        <Text style={styles.tituloText}>Seja Bem-vindo!</Text>
        <Text style={styles.statusText}>
          Status Atual: <Text style={styles.textoAlerta}>Alerta de Enchente Leve</Text>
        </Text>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.botaoAcao} onPress={() => navigation.navigate("Ocorrencia")}>
          <Entypo name="warning" size={24} color="white" />
          <Text style={styles.textoBotao}>Reportar Incidente</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoAcao} onPress={() => navigation.navigate("Abrigos")}>
          <FontAwesome5 name="home" size={24} color="white" />
          <Text style={styles.textoBotao}>Achar abrigo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoAcao} onPress={() => navigation.navigate("Mapa")}>
          <MaterialIcons name="map" size={24} color="white" />
          <Text style={styles.textoBotao}>Mapa interativo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoAcao} onPress={() => navigation.navigate("Alerta")}>
          <Ionicons name="alert" size={24} color="white" />
          <Text style={styles.textoBotao}>Alertas</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.alertasContainer}>
        <Text style={styles.tituloAlertas}>Alertas Recentes</Text>

        <View style={[styles.caixaAlerta, { backgroundColor: '#ffdddd' }]}>
          <Text style={styles.tituloAlerta}>Incêndio perto da Avenida Paulista</Text>
          <Text style={styles.tempoAlerta}>Atualizado a 30 minutos</Text>
        </View>

        <View style={[styles.caixaAlerta, { backgroundColor: '#ddeeff' }]}>
          <Text style={styles.tituloAlerta}>Enchente na zona sul de São Paulo</Text>
          <Text style={styles.tempoAlerta}>Atualizado à 1 hora</Text>
        </View>

        <View style={styles.sobreNosContainer}>
          <Text style={styles.tituloSobreNos}>Sobre Nós</Text>
          <Text style={styles.textoSobreNos}>
            A SafeDrop é uma plataforma digital inovadora que nasceu com o propósito de salvar vidas por meio da
            tecnologia. Em um mundo cada vez mais afetado por mudanças climáticas e desastres naturais, conectamos
            pessoas a recursos de segurança de forma rápida, acessível e confiável.
            {"\n\n"}
            Nossa missão é fornecer informações em tempo real sobre incidentes, enchentes, incêndios e emergências. A
            colaboração ativa da comunidade nos ajuda a ampliar a cobertura e a eficiência da nossa rede.
            {"\n\n"}
            Estamos comprometidos com a inclusão, empatia e inovação, evoluindo constantemente para proteger comunidades
            em todo o Brasil e América Latina. Seja bem-vindo à SafeDrop – sua segurança começa aqui.
          </Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerTexto}> Desenvolvido pela TechRescue</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#5EA9FF' 
    },
  tituloContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  tituloText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  statusText: {
    color: 'white',
    fontSize: 14,
    marginTop: 5,
  },
  textoAlerta: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
  actionsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  botaoAcao: {
    backgroundColor: '#87CEFA',
    width: '48%',
    height: 100,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  textoBotao: {
    marginTop: 8,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  alertasContainer: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  tituloAlertas: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  caixaAlerta: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  tituloAlerta: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  tempoAlerta: {
    color: '#555',
    fontSize: 12,
    marginTop: 5,
  },
  sobreNosContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    marginBottom: 30,
  },
  tituloSobreNos: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  textoSobreNos: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    textAlign: 'justify',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    marginTop: 20,
  },
  footerTexto: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});