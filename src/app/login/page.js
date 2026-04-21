"use client";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    console.log(email, password);
  };
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold">AI News Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Login or create an account
            </p>
          </div>

          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  type="email"
                  value={email}
                  placeholder="johndoe@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FieldDescription>
                  Enter an Email for your account.
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel>Password</FieldLabel>
                <Input
                  type="password"
                  value={password}
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FieldDescription>
                  Must be atleast 8 chartacters long.
                </FieldDescription>
              </Field>
              <Button onClick={handleSubmit}>Submit</Button>
            </FieldGroup>
          </FieldSet>
        </div>
      </div>
      <footer className="text-center text-sm text-muted-foreground py-4">
        © 2026 Neel Patel
      </footer>
    </div>
  );
}
