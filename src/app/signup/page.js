import React from "react";
import { Card, Container } from "./styledComponents";
import Link from "next/link";

function page() {
  return (
    <Container>
      <h1>Signup</h1>
      <Card show={"true"}>
        <input type="text" placeholder="username" />
        <input type="text" placeholder="email" />
        <input type="password" placeholder="password" />
        <input type="password" placeholder="confirm password" />
        <button>Signup</button>
      </Card>
      <p>
        Already have an account? <Link href={"/login"}>Log in!</Link>
      </p>
    </Container>
  );
}

export default page;
