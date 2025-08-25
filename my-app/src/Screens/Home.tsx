import { SafeAreaView, Image, View, Text, Pressable } from "react-native";
import fatecImage from "../../assets/fatec.png";
import Container from "../Components/Container";
import { styles } from "../styles";
import LinkButton from "../Components/LinkButton";

export default function Home() {
  return (
    <>
      <SafeAreaView style={[styles.flexContainer, { flex: 1 }]}>
        <Image source={fatecImage} style={{ borderRadius: 120 }} />
        <View style={{margin: 28}}>
            <Text style={styles.title}>HOME</Text>
        </View>
        <View style={[styles.flexContainer,{flexDirection: "row", gap: 10, width: "90%"} ]}>
          <View style={[styles.flexContainer, {gap: 10, }]}>
            <LinkButton label="Um" />
            <LinkButton label="Dois" />
            <LinkButton label="Três" />
            <LinkButton label="Quatro" />
            <LinkButton label="Cinco" />
          </View>
          <View style={[styles.flexContainer, {gap: 10, }]}>
            <LinkButton label="Seis" />
            <LinkButton label="Sete" />
            <LinkButton label="Oito" />
            <LinkButton label="Nove" />
            <LinkButton label="Dez" />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
