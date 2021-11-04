import React from "react";
import { ReactNode } from "react";
import { LoadingComponent } from "@gooddata/sdk-ui";
import { ErrorComponent } from "@gooddata/sdk-ui";

interface StatusLoaderProps<T, U, S> {
    data: T;
    render: (data: U) => ReactNode;
    error?: S;
    status: "success" | "error" | "loading" | "pending";
    renderError?:(data: S) => ReactNode
}

//General component for handling view based on api state
function StatusLoader<T, U, S>({ data, error, status, render,renderError }: StatusLoaderProps<T, U, S>): JSX.Element {

    //Eventually there should be several types od loading components based on a use case
    if (status === "loading") {
        return <LoadingComponent />;
    }

    if (status === "error" && renderError) {
        return (renderError as unknown as (renderErrorData: S) => JSX.Element)(error as S);
    }

    if (status === "error" && !renderError) {
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
