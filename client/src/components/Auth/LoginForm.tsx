export default function LoginForm() {
  return (
    <div>
      <form>
        <h1>Formulaire de connexion</h1>
        <input type="text" name="email" id="email" />
        <input type="password" name="password" id="password" />
        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
        <button>Se connecter</button>
      </form>
    </div>
  );
}
