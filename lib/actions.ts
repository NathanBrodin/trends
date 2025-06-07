"use server";

export async function getTotalBalanceSubtitle(): Promise<string> {
  const subtitles = [
    "Everything you’ve got.",
    "Your money, right now.",
    "All in, right here.",
    "Your full stack of cash.",
    "The full picture.",
    "This is the big number.",
    "All accounts, all yours.",
  ];

  return subtitles[Math.floor(Math.random() * subtitles.length)];
}
