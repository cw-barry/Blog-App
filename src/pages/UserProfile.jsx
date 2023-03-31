import React, { useContext, useState } from "react";
import { Layout } from "../components/";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const UserProfile = () => {
  const { userInfo, updateUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    first_name: userInfo?.first_name || "",
    last_name: userInfo?.last_name || "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData, navigate);
  };

  return (
    <Layout>
      <Form onSubmit={handleSubmit} className="container mt-4">
        <FormGroup>
          <Label>Email</Label>
          <Input placeholder="with a placeholder" type="email" disabled />
        </FormGroup>
        <FormGroup>
          <Label for="first_name">First Name</Label>
          <Input
            id="first_name"
            name="first_name"
            placeholder="First Name"
            type="text"
            value={formData.first_name}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="last_name">Last Name</Label>
          <Input
            id="last_name"
            name="last_name"
            placeholder="Last Name"
            type="text"
            value={formData.last_name}
            onChange={handleChange}
          />
        </FormGroup>
        <Button style={{ width: "100%", marginTop: "2rem" }}>Submit</Button>
      </Form>
    </Layout>
  );
};

export default UserProfile;
