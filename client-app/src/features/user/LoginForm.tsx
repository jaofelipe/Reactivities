import { RootStoreContext } from "app/stores/rootStore";
import { TextInput } from "app/common/form/TextInput";
import React, { useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Button, Form, Header } from "semantic-ui-react";
import { IUserFormValues } from "app/models/user";
import { FORM_ERROR } from "final-form";
import { combineValidators, isRequired } from "revalidate";
import { ErrorMessage } from "app/common/form/ErrorMessage";

const customIsRequired = (value: string) =>
  isRequired({ message: `${value} é obrigatório` });

const validate = combineValidators({
  email: customIsRequired("Email"),
  password: customIsRequired("Senha"),
});

export const LoginForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { login } = rootStore.userStore;
  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        login(values).catch((error) => ({
          [FORM_ERROR]: error,
        }))
      }
      validate={validate}
      render={({
        handleSubmit,
        submitting,
        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit,
      }) => (
        <Form onSubmit={handleSubmit} error>
          <Header
            as="h2"
            content="Login to Reactivities"
            color="teal"
            textAlign="center"
          />
          <Field name="email" component={TextInput} placeholder="Email" />
          <Field
            name="password"
            component={TextInput}
            placeholder="Senha"
            type="password"
          />
          {submitError && !dirtySinceLastSubmit && (
            <ErrorMessage error={submitError} text='Email ou senha inválido'/>
          )}
          
          <Button
            disabled={invalid && (!dirtySinceLastSubmit || pristine)}
            loading={submitting}
            color='teal'
            content="Login"
            fluid
          />
          {/* <pre>{JSON.stringify(form.getState(), null, 2)}</pre> */}
        </Form>
      )}
    />
  );
};
