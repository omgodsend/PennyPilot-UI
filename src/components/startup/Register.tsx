import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Stepper, rem, Button, Stack, Group, TextInput, Code, PasswordInput, Box, Flex, Center, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { AutocompleteLoading } from '../features/Autocomplete'; 
import { CurrencyInput } from '../features/CurrencyInput';
import { IconCircleX } from '@tabler/icons-react';
import { useAuth } from '../auth/AuthContext';


function Startup() {
  const navigate = useNavigate();
  const {login} = useAuth();

  const handleCompleteSetup = () => {
    login("simulated-token");
    navigate('/dashboard');
  };


  const [active, setActive] = useState(3);
  const [stepIcon, setStepIcon] = useState<React.ReactNode>(null); 
  const [color, setColor] = useState("");


  const handleCurrencyChange = (currency: string) => {
    form.setFieldValue('currency', currency)
  }
  interface FormValues {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    networth: number | null;
    email: string;
    currency: string;
  }

  const form = useForm<FormValues>({
    initialValues: {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      networth: null,
      email: '',
      currency: 'usd',
    },

    validate: (values) => {
      if (active === 0) {
        return {
          username:
            values.username.trim().length < 6
              ? 'Username must include at least 6 characters'
              : null,
          password:
            values.password.length < 6 ? 'Password must include at least 6 characters' : null,
        };
      }

      if (active === 1) {
        return {
          firstName: values.firstName.trim().length < 2 ? 'First name must include at least 2 characters' : null,
          lastName: values.lastName.trim().length < 2 ? 'Last name must include at least 2 characters' : null,
          email: values.email.trim() === '' ? 'Email is required' :
       !/@/.test(values.email) ? 'Invalid Email' :
       !/^\S+@\S+\.\S+$/.test(values.email) ? 'Invalid Email' : null,
          
        };
      }

      if (active === 3) {
        return {
          // networth: (value) => (value <= 0 ? 'Number must be greater than 1' :null)
        }}

      return {};
    },
  });

  const nextStep = () => {
    const formErrors = form.validate();

    if (!formErrors.hasErrors) {
      setStepIcon(null); 
      setColor("");
      setActive((current) => current < 3 ? current + 1 : current);
    } else {
      setStepIcon(<IconCircleX style={{ width: rem(20), height: rem(20)}} />); // Set the error icon
      setColor("red");
    }
  };

  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
    setStepIcon(null);
    setColor("");
  };

  return (
    <Box style={{  display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100vw' }}>
    <Box style={{ maxWidth: '1000px'}}>
      <Stepper active={active} allowNextStepsSelect={false}  onStepClick={setActive}>
        <Stepper.Step color={color} icon={stepIcon} label="First step" description="Credentials">
          <TextInput label="Username" placeholder="Username" {...form.getInputProps('username')} />
          <PasswordInput
            mt="md"
            label="Password"
            placeholder="Password"
            {...form.getInputProps('password')}
          />
        </Stepper.Step>
        <Stepper.Step color={color} icon={stepIcon} label="Second step" description="Personal information">
          <TextInput mb={12} label="First Name" placeholder="First Name" {...form.getInputProps('firstName')} />
          <TextInput mb={12} label="Last Name" placeholder="Last Name" {...form.getInputProps('lastName')} /> 
          <AutocompleteLoading error={form.errors.email} label="Email" placeholder="Email Address" {...form.getInputProps('email')} /> 
        </Stepper.Step>


        <Stepper.Step color={color} icon={stepIcon} label="Final step" description="Account Setup">
         <Center>
           
            <CurrencyInput form={form}
            onCurrencyChange={handleCurrencyChange}/>
         </Center>
        </Stepper.Step>


        <Stepper.Completed>
          <Text size='xl' ta={'center'} fw={900} >Completed! <p>Form values:</p></Text>
          <Code block mt="xl">
            console.log({JSON.stringify(form.values, null, 2)})
          </Code>
        </Stepper.Completed>
      </Stepper>
      

      <Center >
      <Group style={{alignItems:'center'}} mt="xl">
          {active !== 0 && (
            <Button variant="default" onClick={prevStep}>
              Back
            </Button>
          )}
        {active !== 3 && (
            <Button onClick={nextStep}>Next step</Button>
        )}
        {active == 3 && (
        <Button onClick={handleCompleteSetup}>Finish</Button>
        )}
        </Group>
        </Center>
        
        {active !==3 && (
        <Center mt={40}>
        Already a member? <Link to="/Login" ><Button ml={10} variant="outline">Login</Button></Link>
        </Center>


        )}
        
      
    </Box>
  </Box>
  );
}

export default Startup;