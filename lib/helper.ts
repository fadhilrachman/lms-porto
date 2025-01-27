export function formatRupiah(angka: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(angka);
}

export const validatePassword = (password: string) => {
  const passwordRules = [
    {
      regex: /[a-z]/,
      message: "Password must contain at least one lowercase letter",
    },
    {
      regex: /[A-Z]/,
      message: "Password must contain at least one uppercase letter",
    },
    { regex: /\d/, message: "Password must contain at least one digit" },
    {
      regex: /[!@#$%^&*(),.?":{}|<>]/,
      message: "Password must contain at least one special character",
    },
    { regex: /.{8,}/, message: "Password must be at least 8 characters long" },
  ];

  for (const rule of passwordRules) {
    if (!rule.regex.test(password)) {
      return rule.message;
    }
  }

  return true;
};
