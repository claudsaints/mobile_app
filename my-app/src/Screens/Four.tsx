import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import * as Contacts from 'expo-contacts';
import {styles }from '../styles';


interface PhoneNumber {
  id: string;
  label?: string;
  number: string;
}

interface Contact {
  id: string;
  name?: string;
  phoneNumbers?: PhoneNumber[];
  emails?: string[];

}

const Four = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      setHasPermission(status === 'granted');

      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails] ,
        });

        
        if (data.length > 0) {
          setContacts(data.filter(p => p.name[0].toLowerCase() === "c") as []);
        }
      }

      
    })();
  }, []);

  if (hasPermission === null) {
    return <View />; 
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text >Acesso aos contatos negado</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Contact }) => (
    <View style={styles.row}>
      <Text style={styles.name}>{item.name || 'Sem nome'}</Text>
      {item.phoneNumbers ? (
        item.phoneNumbers.map((phone: PhoneNumber, index: number) => (
          <Text key={phone.id || index} style={styles.number}>{phone.number}</Text>
        ))
      ) : (
        <Text style={styles.number}>Sem telefone</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

export default Four;