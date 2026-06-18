import { Card, CardHeader, CardTitle } from "../_components/ui/card";

export default async function Page() {
  return (
    <div className="flex flex-col">
      <Card className="flex flex-col gap-4">
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
