import React, { useState } from "react";
import { View, Text } from "react-native";
import { ListItem, TextInput } from "./list-items";

function extractKids(family) {
  return { id: family.id, children: collectKids(family.children) };
}

function collectKids(children) {
  if (children == undefined || children.length == 0) {
    return [];
  }

  let truncated = [];
  children.forEach((child) => {
    truncated.push({ id: child.id, children: collectKids(child.children) });
  });

  return truncated;
}

export const NoteView = (props) => {
  let root = props.root;
  return (
    <View>
      <NoteTier root={root} />
    </View>
  );
};

const NoteTier = (props) => {
  let root = props.root;
  const [children, setChildren] = useState(root.children);
  const callback = () => {
    setChildren(
      root.children.map((child) => {
        return child;
      })
    );
  };

  let content = children.map((todo, index) => {
    return (
      <View
        style={{
          flexDirection: "column",
        }}
        key={todo.id}
      >
        <ListItem
          edit={true}
          callback={callback}
          item={todo}
          style={{ borderWidth: 5 }}
        />
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1 }} />
          <View style={{ flex: 11 }}>
            <NoteTier root={todo} />
          </View>
        </View>
      </View>
    );
  });

  return (
    <View style={{ flexDirection: "column", backgroundColor: "yellow" }}>
      {content}
    </View>
  );
};
