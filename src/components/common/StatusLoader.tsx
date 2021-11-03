import React from "react";
import { ReactNode } from "react";
import { LoadingComponent } from "@gooddata/sdk-ui";
import { ErrorComponent } from "@gooddata/sdk-ui";

interface StatusLoaderProps<T, U, S> {
    data: T;
    render: (data: U) => ReactNode;
    error?: S;
    status: "success" | "error" | "loading" | "pending";
}

function StatusLoader<T, U, S>({ data, error, status, render }: StatusLoaderProps<T, U, S>): JSX.Element {
    if (status === "loading") {
        return <LoadingComponent />;
    }
    if (status === "error") {
        //Eventually there should be a dynamic error message
        return <ErrorComponent
            message="There was an error getting your execution"
            description={JSON.stringify(error, null, 2)}
        />;
    }

    if (data) {
        return (render as unknown as (renderData: T) => JSX.Element)(data as T);
    }

    return <></>;
}

export default StatusLoader;
