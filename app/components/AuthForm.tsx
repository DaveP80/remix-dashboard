import { Form } from "@remix-run/react";

export default function AuthForm(props: any) {
  return (
    <section className="flex justify-center content-center">
      <Form
        action={`/auth/${props.label == "login" ? "login" : "new-user"}`}
        method="post"
      >
        <label htmlFor="name">{props.label}</label>
        <input
          name="name"
          type="text"
          className="bg-gray-200 hover:bg-white hover:border-gray-300 focus:outline-none focus:bg-white focus:shadow-outline focus:border-gray-300"
        />
        <button className="bg-teal-500 hover:bg-teal-600 focus:outline-none focus:shadow-outline">
          Submit
        </button>
      </Form>
    </section>
  );
}
