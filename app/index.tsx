import { useState, useRef } from "react";
import { Pressable, Text, View, StyleSheet, TextInput, FlatList, TouchableOpacity } from "react-native";


export default function Index() {
  let [data, setdata] = useState<{ title: string; pressed: boolean; pp: boolean }[]>([]);
  const [value, setValue] = useState("");
  const el = useRef<TextInput>(null);
  const [size, setsize] = useState(0);
  function addElement() {
    if (value !== "") {
      data.push({ title: value, pressed: false, pp: false });
      setValue("");
    }
  }

  function removeElement(titl: string) {
    data.splice(data.findIndex(item => item.title === titl), 1);
    setsize(data.length);
  }

  function resetinput() {
    addElement();
    el.current?.clear();
  }

  const Item = ({ title, pressed, pp }: { title: string, pressed: boolean, pp: boolean }) => (
    <TouchableOpacity activeOpacity={0.7} onLongPress={() => { removeElement(title) }} onPress={() => { data[data.findIndex(item => item.title === title)].pressed = !pressed; setsize(Math.random); }}>
      {size === 0 && <Text style={{ fontSize: 1, color: "yellow" }}>{data.length}</Text>}
      <View style={pressed ? styles.item1 : styles.item}>
        <Text style={styles.text}>{title}</Text>
        <View style={pressed ? styles.box : styles.box1}>
          <Pressable
            onPress={() => {
              data[data.findIndex(item => item.title === title)].pp = !pp;
              setsize(Math.random);
            }}
            style={
              {
                width: 30,
                height: 30,
                top: 5,
                opacity: pressed ? 0.5 : 1,
              }
            }
          >
          </Pressable>
          <Text style={{ fontSize: 20, position: "absolute", }}>{pp === false ? "" : "x"}</Text>
        </View>
      </View>


    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <TextInput style={styles.input} placeholder="Enter Element" ref={el} onChangeText={(text) => {
          setValue(text);
        }} />
        <Pressable
          onPress={() => {
            resetinput()
          }}
          style={({ pressed }) => [
            {
              backgroundColor: "red",
              opacity: pressed ? 0.5 : 1,
            }, styles.bottom
          ]}
        >
          {({ pressed }) => (
            <Text style={{ fontWeight: "bold" }}>{pressed ? "Added!" : "Add Item"}</Text>
          )}
        </Pressable>
      </View>
      <View style={styles.body}>
        {size === 0 && <Text style={{ fontSize: 1, color: "yellow" }}>{data.length}</Text>}
        <FlatList
          data={data}
          renderItem={({ item }) => <Item title={item.title} pressed={item.pressed} pp={item.pp} />}
          keyExtractor={item => item.title}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: "center",
  },
  head: {
    flexDirection: "row",
    width: "90%",
    height: 60,
    backgroundColor: "yellow",
    marginBottom: 10,
    marginTop: 10,
    alignItems: "center",
    padding: 5,

  },
  input: {
    width: "70%",
    height: "80%",
    backgroundColor: "white",
    textAlign: "center",
  },
  bottom: {
    width: "30%",
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    width: "90%",
    height: "90%",
    backgroundColor: "yellow",
  },
  item: {
    backgroundColor: "pink",
    margin: 5,
  },
  item1: {
    backgroundColor: "cyan",
    margin: 5,
  },
  box: {
    flexDirection: "row",
    backgroundColor: "pink",
    width: 25,
    height: 25,
    borderRadius: 50,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "flex-end",
    position: "absolute",
    left: 5,
    top: "20%",
  },
  box1: {
    flexDirection: "row",
    backgroundColor: "cyan",
    width: 25,
    height: 25,
    borderRadius: 50,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "flex-end",
    position: "absolute",
    left: 5,
    top: "20%",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  wrapperCustom: {
    borderRadius: 2,
    padding: 8,
  },
});
