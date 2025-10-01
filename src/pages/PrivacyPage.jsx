// src/pages/PrivacyPage.jsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Privacy Policy</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          We respect your privacy. This is a placeholder privacy policy text.
          Replace with actual policy details before going live.
        </p>
      </CardContent>
    </Card>
  );
}

