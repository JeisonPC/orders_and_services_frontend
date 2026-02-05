import { NextResponse } from "next/server";

const getApiUrl = () => process.env.NEXT_PUBLIC_CUSTOMERS_API_URL!;

export async function GET() {
  try {
    console.log("Fetching customers from:", `${getApiUrl()}/customers`);

    const response = await fetch(`${getApiUrl()}/customers`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Backend response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend error:", errorText);
      throw new Error(
        `HTTP error! status: ${response.status}, body: ${errorText}`,
      );
    }

    const data = await response.json();
    console.log("Customers data:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json(
      { error: "Error al obtener los clientes", details: String(error) },
      { status: 500 },
    );
  }
}
