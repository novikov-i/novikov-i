import React, { useCallback, useState, ReactNode } from "react";

import { CustomSelect, Text } from "@vkontakte/vkui";

import debounce from "lodash.debounce";

import { loadContacts } from "../api";

interface Props {
  onChange?: (e: any) => void;
}

function UserCustomSelect({onChange}: Props) {
  const [remoteQuery, setRemoteQuery] = useState("");
  const [fetching, setFetching] = useState(false);
  const [remoteUsers, setRemoteUsers] = useState([]);

  const searchAddress = useCallback((e: any) => {
    const _remoteQuery = e.target.value;
    setRemoteQuery(_remoteQuery);

    if (_remoteQuery.length < 3) {
      setRemoteUsers([]);
      setFetching(false);
    } else {
      fetchRemoteUsers(_remoteQuery);
    }
  }, []);

  const debouncedChangeHandler = useCallback(debounce(searchAddress, 300), []);

  const fetchRemoteUsers = useCallback((query: string) => {
    setFetching(true);
    return loadContacts(query)
      .then((data: any) => {
        setRemoteUsers(
          data?.result?.map((el: any) => {
            return {
              label: `${el.NAME} ${el.LAST_NAME}`,
              value: `${el.NAME} ${el.LAST_NAME}`,
            };
          })
        );
      })
      .finally(() => {
        setFetching(false);
      });
  }, []);

  const renderDropdown = ({
    defaultDropdownContent,
  }: {
    defaultDropdownContent: ReactNode;
  }): ReactNode => {
    if (remoteQuery.length < 3) {
      return (
        <Text
          style={{ padding: 12, color: "var(--vkui--color_text_secondary)" }}
        >
          Нужно ввести хотя бы три символа
        </Text>
      );
    }
    return defaultDropdownContent;
  };

  return (
    <CustomSelect
      placeholder="Введите фамилию клиента"
      onInputChange={debouncedChangeHandler}
      // onSelect={(val: any) => console.log(val)}
      searchable
      filterFn={(option: any) => true}
      options={remoteUsers}
      onChange={onChange}
      // disabled={fetching}
      renderDropdown={!fetching ? renderDropdown : undefined}
      fetching={fetching}
    />
  );
}

export default UserCustomSelect;
