import { Form } from "@remix-run/react";

export default function AuthForm (props: any) {
  return (
    <section className="flex justify-center content-center">
    <Form action={`/auth/${props.label == "login" ? "login" : "new-user"}`} method="post">
    <label htmlFor="name">{props.label}</label>
      <input name="name" type="text" className="bg-white text-black"/>
      <button name="submit" type="submit">Submit</button>
    </Form>
    </section>
  );
}