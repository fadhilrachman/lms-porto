import { AuthError } from "next-auth";
// import { isRedirectError } from "next/dist/client/components/redirect-error";

type Options<T> = {
  actionFn: () => Promise<T>;
  successMessage?: string;
};

const executeAction = async <T>({
  actionFn,
  successMessage = "The actions was successful",
}: Options<T>): Promise<{ success: boolean; message: string }> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return actionFn().then((_) => {
      return {
        success: true,
        message: successMessage,
      };
    });

  } catch (error) {
    if (error instanceof AuthError) {
      console.log(
        "[auth error message]:",
        JSON.stringify({
            name: error.name,
            type: error.type,
            message: error.message,
            cause: error.cause,
          },
          null,
          2,
        )
      );
      
      // if (isRedirectError(error)) {
      //   throw error;
      // }
    }

    return {
      success: false,
      message: "An error has occurred during executing the action",
    };
  }
};

export { executeAction };
