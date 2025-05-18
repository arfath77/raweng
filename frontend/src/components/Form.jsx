import {
  Button,
  Card,
  Container,
  Flex,
  Group,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { Link } from 'react-router-dom';

export const Form = ({ handleSubmit, fields, formType }) => {
  const formTitle = formType === 'login' ? 'Login' : 'Register';
  const fieldsHtml = fields.map(field => {
    if (field.type === 'password') {
      return (
        <PasswordInput
          value={field.value}
          onChange={e => field.setValue(e.target.value)}
          type="password"
          placeholder="Password"
          required
          minLength={8}
          maxLength={20}
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$&+,:;=?@#|'<>.^*()%!-])[A-Za-z\d$&+,:;=?@#|'<>.^*()%!-]{8,20}$"
          w={'100%'}
          error={
            field.value.length < 8 ||
            field.value.length > 20 ||
            !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$&+,:;=?@#|'<>.^*()%!-])[A-Za-z\d$&+,:;=?@#|'<>.^*()%!-]{8,20}$/.test(
              field.value
            )
              ? 'Password must be 8-20 characters long and include atleast one uppercase letter, one lowercase letter, one number, and one special character.'
              : null
          }
        />
      );
    }
    if (field.type === 'email') {
      return (
        <TextInput
          key={field.name}
          value={field.value}
          onChange={e => field.setValue(e.target.value)}
          placeholder={field.placeholder}
          required
          type="email"
          w={'100%'}
          error={
            field.value.length < 3 ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)
              ? 'Invalid email address'
              : null
          }
        />
      );
    }
    return (
      <TextInput
        key={field.name}
        value={field.value}
        onChange={e => field.setValue(e.target.value)}
        placeholder={field.placeholder}
        required
        type="text"
        w={'100%'}
        error={
          field.value.length < field.minLength ? 'This field is required' : null
        }
      />
    );
  });

  return (
    <Container size={1140} py={'md'} px={0}>
      <Flex justify={'center'} align="center" style={{ height: '80vh' }}>
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          w={{ base: '100%', md: 350 }}
        >
          <form onSubmit={handleSubmit}>
            <Title order={2} py={'md'}>
              {formTitle}
            </Title>
            <Group>
              {fieldsHtml}
              <Button type="submit" w={'100%'}>
                {formTitle}
              </Button>
              <Link to={formType === 'login' ? '/register' : '/login'}>
                <Text size="sm" w={'100%'} c={'dimmed'} td={'none'}>
                  {formType === 'login'
                    ? "Don't have an account?"
                    : 'Already have an account?'}
                </Text>
              </Link>
            </Group>
          </form>
        </Card>
      </Flex>
    </Container>
  );
};
