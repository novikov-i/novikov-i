import React, { useCallback, useState, ReactNode } from "react";

import { CustomSelect, Text } from "@vkontakte/vkui";

import debounce from "lodash.debounce";

import { loadAdressessByQuery } from "../api";

function AddressCustomSelect() {
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
    return loadAdressessByQuery(query)
      .then((data: any) => {
        setRemoteUsers(
          data?.suggestions?.map((el: any) => {
            return {
              label: el.value,
              value: el.value,
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
      placeholder="Введите адрес"
      onInputChange={debouncedChangeHandler}
      // onSelect={(val: any) => console.log(val)}
      searchable
      filterFn={(option: any) => true}
      options={remoteUsers}
      onChange={(val: any) => console.log("val", val.target.value)}
      // disabled={fetching}
      renderDropdown={!fetching ? renderDropdown : undefined}
      fetching={fetching}
    />
  );
}

export default AddressCustomSelect;
