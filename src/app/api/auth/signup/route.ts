import { NextRequest, NextResponse } from 'next/server';
import pb from '@/lib/pb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, mobile, gender, email, password, passwordConfirm } = body;

    // Validate required fields
    if (!name || !mobile || !gender || !email || !password || !passwordConfirm) {
      return NextResponse.json(
        { success: false, error: 'validation_error' },
        { status: 400 }
      );
    }

    // Create user - let PocketBase handle verification naturally
    const userData = {
      name,
      mobile,
      gender,
      email,
      password,
      passwordConfirm,
    };

    const user = await pb.collection('users').create(userData);

    return NextResponse.json({ 
      success: true, 
      message: 'signup_success',
      user: user 
    });

  } catch (error: unknown) {
    let errorMessage = 'general_error';
    
    // Handle PocketBase specific errors
    if (error && typeof error === 'object' && 'data' in error && error.data && typeof error.data === 'object' && 'message' in error.data) {
      errorMessage = error.data.message as string;
    } else if (error && typeof error === 'object' && 'message' in error) {
      errorMessage = error.message as string;
    }
    
    // Map common PocketBase errors to translation keys
    const errorMap: { [key: string]: string } = {
      'Failed to create record.': 'Failed to create record',
      'The email is invalid or already in use.': 'email_invalid',
      'The mobile is invalid or already in use.': 'mobile_invalid',
    };
    
    // Use mapped error or original
    errorMessage = errorMap[errorMessage] || errorMessage;

    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage 
      },
      { status: 400 }
    );
  }
} 