import React from 'react';

const Help = () => {
  const styles = {
    container: {
      maxWidth: '800px',
      margin: '20px auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      lineHeight: '1.6',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      borderRadius: '8px',
      background: '#fff',
    },
    section: {
      marginBottom: '40px',
    },
    header: {
      fontSize: '28px',
      borderBottom: '2px solid #333',
      paddingBottom: '10px',
      marginBottom: '20px',
    },
    subHeader: {
      fontSize: '24px',
      marginBottom: '10px',
    },
    listItem: {
      marginBottom: '10px',
    },
    codeBlock: {
      background: '#f5f5f5',
      padding: '10px',
      borderRadius: '4px',
      overflowX: 'auto',
    },
  };

  return (
    <div style={styles.container}>
      <section style={styles.section}>
        <h1 style={styles.header}>Help</h1>

        <div style={styles.section}>
          <h2 style={styles.subHeader}>Getting Started</h2>
          <p>
            Welcome to our help page. Here's how you can get started with our
            application:
          </p>
          <ol>
            <li style={styles.listItem}>
              <strong>Sign Up:</strong> Register with your name, email, and
              password.
            </li>
            <li style={styles.listItem}>
              <strong>Login:</strong> Securely login using your credentials.
            </li>
          </ol>
        </div>

        <div style={styles.section}>
          <h2 style={styles.subHeader}>Posting Content</h2>
          <p>
            Learn how to create and share travel stories using our application:
          </p>
          <ul>
            <li style={styles.listItem}>
              <strong>Create Post:</strong> Post photos and stories of your
              travel adventures.
            </li>
            <li style={styles.listItem}>
              <strong>Interact:</strong> Like and comment on posts from other
              users.
            </li>
          </ul>
        </div>
        <div style={styles.section}>
        <h2 style={styles.subHeader}>Map Usage</h2>
        <ul>
            <li style={styles.listItem}>
              <strong>Pin Place:</strong> Pin your favourite place and give it ratings, so that your followers,friends/family are benifitted
            </li>
        </ul>

        </div>
        <div style={styles.section}>
        <h2 style={styles.subHeader}>Chat with Ed</h2>
        <ul>
            <li style={styles.listItem}>
              <strong>AI for assistance:</strong> When in doubt, chat with Ed! Plan your itenaries, flights with Ed and make ypur trip hassle free!
            </li>
        </ul>

        </div>

        <div style={styles.section}>
          <h2 style={styles.subHeader}>Technical Details</h2>
          <p>Here are some technical aspects of our application:</p>
          <ul>
            <li style={styles.listItem}>
              <strong>Frontend:</strong> Built with React.js and CSS.
            </li>
            <li style={styles.listItem}>
              <strong>Backend:</strong> Powered by Node.js and Express.js.
            </li>
            <li style={styles.listItem}>
              <strong>Database:</strong> MongoDB used as the database.
            </li>
            <li style={styles.listItem}>
              <strong>Authentication:</strong> Secure login using JSON Web
              Tokens (JWT).
            </li>
          </ul>
        </div>

        <div style={styles.section}>
          <h2 style={styles.subHeader}>Support and Contact</h2>
          <p>
            For any further assistance or queries, please contact our support
            team at team17@gmail.com.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Help;
