import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  AdaptivityProvider,
  ConfigProvider,
  AppRoot,
  SplitLayout,
  SplitCol,
  View,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Header,
  Group,
  SimpleCell,
  FormLayout,
  FormItem,
  Input
} from "@vkontakte/vkui";

// import Image from "@vkontakte/vkui/src/components/";

// import "@vkontakte/vkui/dist/components.css";
// import "@vkontakte/vkui-tokens/themes/vkCom/cssVars/declarations/onlyVariables.css";
// import "@vkontakte/vkui-tokens/themes/vkComDark/cssVars/declarations/onlyVariablesLocal.css";

import "./index.css";

import { ClaimForm } from "./components/ClaimForm";

// import baseTheme from '@vkontakte/vkui-tokens/themes/vkBase/cssVars/theme';

// baseTheme.se

const App = () => {
  
  const [formItemStatus, setFormItemStatus] = useState("default");

  const [activePanel, setActivePanel] = React.useState("main");

  //style={{ "--vkui--color_text_primary": 'blue' } as React.CSSProperties}

  return (
    <AppRoot>
      <SplitLayout>
        <SplitCol>
          <View activePanel={activePanel}>
            <Panel id="main">
              <PanelHeader>Заполните форму</PanelHeader>
              <Group>
                <ClaimForm setActivePanel={setActivePanel} />
              </Group>
            </Panel>
          </View>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
};

ReactDOM.render(
  <ConfigProvider appearance="dark">
    <AdaptivityProvider>
      <App />
    </AdaptivityProvider>
  </ConfigProvider>,
  document.getElementById("root")
);
