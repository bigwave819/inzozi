'use server'

import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import z from "zod"

const employeeSchema = z.object({
    name: z.string().min(2, 'the minimum character is 2'),
    email: z.string().email("please enter the valid email"),
    phone: z.string().min(10, 'the minimum is 10 characters'),
    role: z.string().min(2, 'the minimum is atleast 2 characters'),
    image: z.string().url('enter the valid Url') // Changed from imageUrl to image
})

export async function createEmployee(data: unknown) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session?.user) {
        redirect('/')
    }

    try {
        const result = employeeSchema.safeParse(data)

        if (!result.success) {
            console.log('Validation error:', result.error.format()); // Add logging
            return { 
                success: false,
                message: 'Validation failed',
                error: result.error.format() 
            }
        }

        const { name, email, phone, role, image } = result.data

        // Check for existing employee with same email
        const existingEmployee = await prisma.employees.findUnique({
            where: { email }
        })

        if (existingEmployee) {
            return {
                success: false,
                message: 'Employee with this email already exists'
            }
        }

        const employee = await prisma.employees.create({
            data: { 
                name, 
                email, 
                phone, 
                role, 
                imageUrl: image // Map 'image' from form to 'imageUrl' in database
            }
        })

        revalidatePath('/admin/employees')

        return { 
            success: true,
            message: 'Employee created successfully'
        }
    } catch (error) {
        console.error('Database error:', error);
        return {
            success: false,
            message: 'Failed to add the employee'
        }
    }
}