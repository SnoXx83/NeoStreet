export default function SignUpForm() {
  return (
    <div>
      <form>
        <h1>Formulaire d'inscription</h1>
        <input type="text" name="lastname" placeholder="Lastname" required />
        <input type="text" name="firstname" placeholder="Firstname" required />
        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <input
          type="password"
          name="confirmPassord"
          placeholder="Confirm password"
          required
        />
        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
        <button>S'inscrire</button>
      </form>
    </div>
  );
}
