import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "test@nickbolles.com";

  // cleanup the existing database
  // await prisma.user.delete({ where: { email } }).catch(() => {
  //   // no worries if it doesn't exist yet
  // });
  await prisma.giftsOnGiftLists.deleteMany({})
  await prisma.gift.deleteMany({})
  await prisma.giftList.deleteMany({})
  await prisma.user.deleteMany({})

  const hashedPassword = await bcrypt.hash("foobarfoobar", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });
  const user2 = await prisma.user.create({
    data: {
      email: "gifter@nickbolles.com",
      name: "Bruh",
    },
  });

  const gift1: Prisma.GiftUncheckedCreateInput = {
    title: "My little pony",
    link: "https://www.bing.com/aclk?ld=e8CtzxJavlhkdqfcorsC0USjVUCUwxIsf5mehj8u9kLybLAkiSmgarwiODM_UnkcmGdfJHTKnscFn-02NSRAYA9abU6QhwFxNJCErKmAdk_Y-2rSl-iIhDRG0o6UjTow-NW7nPzrUZrXBcDEk86zFw0NfLfv3ZHS5A8NsrOQ9QD6ksXRhB5Cb6-xfcId27d2iTBJq1IbgJE8pj4ZpNUQAhC7NaJDB6C-WmdxiS3EpWyfFkGjHvGaIqDqxGv6rQdxvMW2Mbqdcn13_PSBlbs3h0t49bXPAYJb_0tEVkqUJol58zVrs4&u=aHR0cHMlM2ElMmYlMmZ3d3cudGFyZ2V0LmNvbSUyZnAlMmZteS1saXR0bGUtcG9ueS1hLW5ldy1nZW5lcmF0aW9uLWZyaWVuZHNoaXAtc2hpbmUtY29sbGVjdGlvbi10YXJnZXQtZXhjbHVzaXZlJTJmLSUyZkEtODE5Njk4NDQlM2ZyZWYlM2R0Z3RfYWR2X1hTMDAwMDAwJTI2QUZJRCUzZGdvb2dsZV9wbGFfZGYlMjZmbmRzcmMlM2R0Z3RhbyUyNkRGQSUzZDcxNzAwMDAwMDEyNzkwNzQ4JTI2Q1BORyUzZFBMQV9Ub3lzJTI1MkJTaG9wcGluZyUyNTdDVG95c19FY29tbV9IYXJkbGluZXMlMjZhZGdyb3VwJTNkU0NfVG95cyUyNkxJRCUzZDcwMDAwMDAwMTIzMDcyOHBncyUyNkxOTSUzZFBST0RVQ1RfR1JPVVAlMjZuZXR3b3JrJTNkbyUyNmRldmljZSUzZGMlMjZsb2NhdGlvbiUzZCUyNnRhcmdldGlkJTNkcGxhLTQ1ODUxNjk2NDk1OTkwNzglM2FhdWQtODA1NjcwNDA2JTI2Z2NsaWQlM2RmZWU4MjUyNjBlYWQxMDdlNmMyNDQ2ODY5ZjRiMzIwYSUyNmdjbHNyYyUzZDNwLmRzJTI2ZHNfcmwlM2QxMjQ2OTc4JTI2ZHNfcmwlM2QxMjQ4MDk5JTI2cmVmJTNkdGd0X2Fkdl9YUzAwMDAwMCUyNkFGSUQlM2RiaW5nX3BsYV9kZiUyNkNQTkclM2RQTEFfVG95cyUyNTJCU2hvcHBpbmclMjU3Q1RveXNfRWNvbW1fSGFyZGxpbmVzJTI2YWRncm91cCUzZFNDX1RveXMlMjZMSUQlM2Q3MDAwMDAwMDEyMzA3MjhwYnMlMjZuZXR3b3JrJTNkcyUyNmRldmljZSUzZGMlMjZxdWVyeXN0cmluZyUzZG15JTI1MjBsaXR0bGUlMjUyMHBvbm5pZSUyNm1zY2xraWQlM2RmZWU4MjUyNjBlYWQxMDdlNmMyNDQ2ODY5ZjRiMzIwYQ&rlid=fee825260ead107e6c2446869f4b320a&ntb=1",
    imageUrl:
      "https://target.scene7.com/is/image/Target/GUEST_52467202-fa89-4399-88ff-a5bb8a18aaa5?wid=725&hei=725&qlt=80&fmt=webp",
    purchased: true,
    purchasedById: user2.id,
    userId: user.id,
  };

  const gift2: Prisma.GiftUncheckedCreateInput = {
    title: "Monster truck!",
    link: "https://www.google.com/aclk?sa=l&ai=DChcSEwjOtoDoi4b8AhWJFdQBHdHcARgYABAOGgJvYQ&sig=AOD64_1TuVYv_o8VtDfojUBzKr4AlFJALg&ctype=46&q=&ved=2ahUKEwjtv_bni4b8AhW5m2oFHRbtAYQQqygoAnoECAMQJA&adurl=",
    imageUrl:
      "https://target.scene7.com/is/image/Target/GUEST_75087092-0fed-4469-bfe1-3a186b914eda?wid=725&hei=725&qlt=80&fmt=webp",
    notes: "The blue one please!",
    // purchased: false,
    userId: user.id
  };

 const gift3 =  await prisma.gift.create({
    data: {
      title: "Something warm",
      notes: `Something to keep me warm in my freezing office. 
  Maybe like [this blanket](https://www.google.com/aclk?sa=l&ai=DChcSEwi46LfGi4b8AhUOE60GHXe6CTkYABAKGgJwdg&sig=AOD64_3MGoXJBnl4RslnVH7pt2SHVOjDXw&ctype=5&q=&ved=2ahUKEwiUu67Gi4b8AhWYMEQIHdcdBeEQww8oAnoECAEQDQ&adurl=)
  or this [hot cocoa](https://www.google.com/aclk?sa=l&ai=DChcSEwi-8O-_i4b8AhUqKUwKHWXTABgYABAIGgJvYQ&ae=2&sig=AOD64_3WN880zVAuLn9tRnFE17RTM0-A4Q&ctype=5&q=&ved=2ahUKEwiXu-O_i4b8AhX5mWoFHdg0BPMQww8oAnoECAMQFw&adurl=)`,
      // purchased: false,
      userId: user.id,
    }
  })

  await prisma.giftList.create({
    data: {
      name: "My first giftlist",
      gifts: {
        create: [
          {
            gift: {
              create: gift1,
            },
          },
          {
            gift: {
              create: gift2,
            },
          },
          {
            gift: {connect: {id: gift3.id}},
          }
        ]
      },
      userId: user.id,
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
