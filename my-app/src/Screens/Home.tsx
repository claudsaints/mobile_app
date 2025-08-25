import { SafeAreaView, Image, View, Text, Pressable } from "react-native";
import fatecImage from "../../assets/fatec.png";
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
            <LinkButton navigateTo="Um" label="Um" />
            <LinkButton navigateTo="Dois" label="Dois" />
            <LinkButton navigateTo="Tres" label="Três" />
            <LinkButton navigateTo="Quatro" label="Quatro" />
            <LinkButton navigateTo="Cinco" label="Cinco" />
          </View>
          <View style={[styles.flexContainer, {gap: 10, }]}>
            <LinkButton navigateTo="Seis" label="Seis" />
            <LinkButton navigateTo="Sete" label="Sete" />
            <LinkButton navigateTo="Oito" label="Oito" />
            <LinkButton navigateTo="Nove" label="Nove" />
            <LinkButton navigateTo="Dez" label="Dez" />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
