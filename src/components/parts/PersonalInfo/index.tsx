'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Flag, FlagOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { profileSchema } from '@/lib/validations/profile';

const PersonalInfo = () => {
  const [countryCode, setCountryCode] = useState('');

  const handleCountryCode = (value: string) => {
    setCountryCode(value);
  };

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema)
  });

  function onSubmit(values: z.infer<typeof profileSchema>) {
    values.phoneNumber = countryCode + values.phoneNumber;
    console.log(values);
  }
  return (
    <main className="p-3 lg:col-span-9">
      <article className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h6 className="font-semibold text-primary-80 text-heading-6">Username</h6>
              <p className="font-medium text-primary-50 text-body-md">something</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="destructive">Remove Photo</Button>
            <Button>Upload New photo</Button>
          </div>
        </div>

        <Separator />

        <Card className="px-6 py-8">
          <Form {...profileForm}>
            <h6 className="font-semibold text-primary-80 text-heading-6 mb-6">
              Personal Information
            </h6>
            <form onSubmit={profileForm.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={profileForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe@gmail.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-primary-0">
                            <SelectValue placeholder="Select a location" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="indonesia">Indonesia</SelectItem>
                          <SelectItem value="united states">United States</SelectItem>
                          <SelectItem value="japan">Japan</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <div className="flex">
                        <Select onValueChange={handleCountryCode}>
                          <SelectTrigger className="w-[7.5rem] h-11 bg-primary-0 rounded-r-none">
                            <SelectValue placeholder={<FlagOff />} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="+62">
                                <Flag className="inline mr-2" />
                                +62
                              </SelectItem>
                              <SelectItem value="+1">
                                <Flag className="inline mr-2" />
                                +1
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <Input
                          placeholder="012345678910"
                          {...field}
                          className="rounded-l-none"
                          type="tel"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button type="submit">Update Profile</Button>
              </div>
            </form>
          </Form>
        </Card>
      </article>
    </main>
  );
};

export default PersonalInfo;