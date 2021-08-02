import React, { useCallback, useState } from "react";
import { FunctionComponent } from "react";
import { Button, FormLabel } from "react-bootstrap";
import { ArrowRepeat } from "react-bootstrap-icons";

import ErrorMessage from "./ErrorMessage";

interface Props {
  label: string;
  value: string;
  error: string;
  refresh?: () => Promise<void>;
}

const DisplayAsyncValue: FunctionComponent<Props> = ({ label, value, error, refresh }) => {
  const [refreshPending, setRefreshPending] = useState(false);
  const onRefresh = useCallback(async () => {
    if (!refresh) {
      return;
    }

    setRefreshPending(true);
    await refresh();
    setRefreshPending(false);
  }, [refresh]);

  return (
    <div>
      {value && (
        <p>
          <FormLabel>{label}: </FormLabel> {value}{" "}
          {refresh && (
            <Button
              variant="dark"
              disabled={refreshPending}
              onClick={onRefresh}
            >
              <ArrowRepeat />
            </Button>
          )}
        </p>
      )}
      <ErrorMessage>{error}</ErrorMessage>
    </div>
  );
};

export default DisplayAsyncValue;
