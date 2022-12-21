import React from "react";
import {
  Header,
  Group,
  SimpleCell,
  Button,
  ButtonGroup,
  Div
} from "@vkontakte/vkui";
import { Icon16DoneCircle, Icon16WorkOutline } from '@vkontakte/icons';
import { Interface } from "readline";

interface Props {
    setActivePanel: (data: string) => void;
}

export const StartStep = ({ setActivePanel }: Props) => {
  return (
    // <Group header={<Header mode="secondary">Items</Header>}>
    //      <SimpleCell>Start page</SimpleCell><SimpleCell>Start page</SimpleCell>
    // </Group>
    <Div>
    <ButtonGroup mode="horizontal" gap="m" stretched>
        <Button
            size="l"
            appearance="accent"
            stretched
            before={<Icon16WorkOutline />}
          >
            По выезду
          </Button>
          <Button
            size="l"
            appearance="positive"
            stretched
            before={<Icon16DoneCircle />}
            onClick={() => setActivePanel("finalReport")}
          >
            Итоговый
          </Button>
    </ButtonGroup>
    </Div>
  );
};
